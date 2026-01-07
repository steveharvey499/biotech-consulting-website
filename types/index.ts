export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  honeypot?: string;
}

export interface ClientType {
  title: string;
  description: string;
  challenges: string[];
}

export interface Service {
  title: string;
  description: string;
  whoItsFor: string;
  deliverables: string[];
}

export interface SubscriptionData {
  email: string;
}
