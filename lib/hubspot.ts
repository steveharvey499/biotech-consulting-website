import { Client } from "@hubspot/api-client";

// Initialize HubSpot client
const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

export interface ContactData {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
}

export interface ContactNoteData {
  contactId: string;
  note: string;
}

/**
 * Create or update a contact in HubSpot
 * If contact exists (by email), it will be updated; otherwise, a new contact will be created
 */
export async function createOrUpdateContact(data: ContactData) {
  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      throw new Error("HUBSPOT_ACCESS_TOKEN is not configured");
    }

    // Prepare contact properties
    const properties: Record<string, string> = {
      email: data.email,
    };

    if (data.firstName) {
      properties.firstname = data.firstName;
    }

    if (data.lastName) {
      properties.lastname = data.lastName;
    }

    if (data.company) {
      properties.company = data.company;
    }

    if (data.phone) {
      properties.phone = data.phone;
    }

    // Try to find existing contact by email
    const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            {
              propertyName: "email",
              operator: "EQ" as any,
              value: data.email,
            },
          ],
        },
      ],
      properties: ["email", "firstname", "lastname", "company"],
      limit: 1,
    });

    let contactId: string;

    if (searchResponse.results && searchResponse.results.length > 0) {
      // Contact exists, update it
      contactId = searchResponse.results[0].id;
      await hubspotClient.crm.contacts.basicApi.update(contactId, {
        properties,
      });
    } else {
      // Contact doesn't exist, create it
      const createResponse = await hubspotClient.crm.contacts.basicApi.create({
        properties,
      });
      contactId = createResponse.id;
    }

    return { contactId, success: true };
  } catch (error) {
    console.error("Error creating/updating HubSpot contact:", error);
    throw error;
  }
}

/**
 * Add a contact to a HubSpot list
 */
export async function addContactToList(
  contactId: string,
  listId: string
): Promise<void> {
  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      throw new Error("HUBSPOT_ACCESS_TOKEN is not configured");
    }

    // Use the lists API to add contacts
    await (hubspotClient.crm.lists.listsApi as any).addContactsToList(listId, {
      emails: [],
      ids: [contactId],
    });
  } catch (error) {
    console.error("Error adding contact to HubSpot list:", error);
    throw error;
  }
}

/**
 * Create a note on a contact record
 * Note: This creates a note and associates it with the contact
 */
export async function createContactNote(data: ContactNoteData): Promise<void> {
  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      throw new Error("HUBSPOT_ACCESS_TOKEN is not configured");
    }

    // Create the note using objects API
    const noteResponse = await (hubspotClient.crm.objects.notes as any).basicApi.create({
      properties: {
        hs_note_body: data.note,
        hs_timestamp: Date.now().toString(),
      },
      associations: [
        {
          to: { id: data.contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED" as any,
              associationTypeId: 214, // Contact to Note association
            },
          ],
        },
      ],
    });
  } catch (error) {
    console.error("Error creating HubSpot contact note:", error);
    // Don't throw - note creation failure shouldn't break contact creation
    console.warn("Note creation failed, but contact was created successfully");
  }
}

/**
 * Update contact properties (for subscription tracking, etc.)
 */
export async function updateContactProperties(
  contactId: string,
  properties: Record<string, string>
): Promise<void> {
  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      throw new Error("HUBSPOT_ACCESS_TOKEN is not configured");
    }

    await hubspotClient.crm.contacts.basicApi.update(contactId, {
      properties,
    });
  } catch (error) {
    console.error("Error updating HubSpot contact properties:", error);
    throw error;
  }
}

