export interface BlogPost {
  id: string;
  letter: "A" | "C" | "T" | "G"; // DNA base letter that leads the post
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string; // Full blog post content (can be HTML or markdown)
}

export const getLetterColor = (letter: "A" | "C" | "T" | "G"): string => {
  const colorMap: Record<string, string> = {
    A: "text-adenine",
    C: "text-cytosine",
    T: "text-thymine",
    G: "text-guanine",
  };
  return colorMap[letter] || colorMap.A;
};

export const blogPosts: BlogPost[] = [
  {
    id: "amplification-brand-strategy",
    letter: "A",
    title: "The Brand Attention Strategy: 0 to 10M+ Impressions",
    excerpt: "What are we going to do? No one knows us! That panicked thought hit me hard in 2022 when a survey revealed the uncomfortable truth: hardly anyone had heard of our company. Here's how I went from zero to 10M+ impressions with almost £0 spent on marketing.",
    date: "2025-12-30",
    readTime: "7 min read",
    category: "Attention",
    content: `
      <p>"What are we going to do? No one knows us!"</p>
      
      <p>That panicked thought hit me hard in 2022 when a survey revealed the uncomfortable truth: hardly anyone had heard of our company.</p>
      
      <p>What's the point in working hard to make products when nobody knows you exist?</p>
      
      <p>As every founder-CEO knows, I didn't have the time for a marketing campaign. I also didn't have the budget.</p>
      
      <p>So I decided to use LinkedIn to capture attention for my voice and our company. One post at a time, I'd share what I knew. My hope was that sharing technical insights, founder lessons, and the problems we were solving would bring people along on our journey.</p>
      
      <p>Post number 1 was a public declaration that I would do it. So there was no going back.</p>
      
      <h2>Generosity, Not Self-Promotion</h2>
      
      <p>If every post is about you, your follower base will be, just you. But if you share what you know and what you've experienced, you may be helping others. And that's what builds a following.</p>
      
      <p>When you share a technical insight, you're saving someone months of trial and error. When you break down a problem you solved, you're helping other founders avoid the same mistakes. When you explain your thinking, you're contributing to your industry's collective knowledge.</p>
      
      <p>Those posts are generous, not self-promotional. And paradoxically, that's exactly what builds your brand.</p>
      
      <p>Then, every now and then, when you post about a job opening or a company milestone, tens of thousands of people are already paying attention.</p>
      
      <h2>Stop Selling. Start Sharing.</h2>
      
      <p>A strategy to share valuable information will build a following. Take people with you on that journey, so you are at the front of their mind when they're ready to buy. Here are four simple ideas I ran with:</p>
      
      <ol>
        <li><strong>Technical breakthroughs:</strong> I broke down complex biotech problems we were solving, making them accessible without dumbing them down.</li>
        <li><strong>Founder lessons:</strong> I shared my expensive mistakes, the pivots, and the decisions that kept me up at night.</li>
        <li><strong>Our mission:</strong> I explained why we were doing this work and what impact we hoped to have.</li>
        <li><strong>The building process:</strong> I showed what it actually looks like to grow a biotech company from the lab bench to scale.</li>
      </ol>
      
      <h2>I've No Time For This!</h2>
      
      <p>As you're building a company, your to-do list is infinite. When I started, I didn't need another job on top of everything else. I also didn't want to look stupid by writing something dumb.</p>
      
      <p>Every single post, I almost deleted after 5 minutes. (I still do.) But I kept hitting publish.</p>
      
      <p>And this is another great lesson. Consistency matters, and the effects compound over time. After hundreds of posts, here's what I achieved:</p>
      
      <ul>
        <li>~40,000 followers</li>
        <li>10M+ impressions</li>
        <li>Almost £0 spent on marketing</li>
      </ul>
      
      <p>But those numbers only matter because of what they enable. I posted about a new role, and within 24 hours, 20,000 people had seen it with zero promotional costs.</p>
      
      <p>Let me show you what that attention-grabbing means in real terms:</p>
      
      <p><strong>Before:</strong></p>
      
      <ul>
        <li>£10,000-£12,500 in recruitment fees on a hire of £50k (20-25%)</li>
        <li>Months searching for qualified candidates</li>
        <li>Cold outreach to people who'd never heard of us</li>
      </ul>
      
      <p><strong>After:</strong></p>
      
      <ul>
        <li>Half the people at a local recruitment fair already knew us from social media</li>
        <li>Inbound applications from candidates who've been following our journey</li>
        <li>Zero recruitment fees for most positions</li>
      </ul>
      
      <p>Suddenly, you've saved tens of thousands on hiring. Your brand is bringing talent to you rather than you having to chase it. That's the power of capturing attention: your expertise becomes a recruitment engine.</p>
      
      <h2>What I've Learned About Founder and CEO Brand</h2>
      
      <p>Your expertise is more valuable than you think. You're solving problems daily that others in your industry would kill to understand. Every technical challenge you've cracked, every hiring mistake you've made, every product decision you've wrestled with. That's valuable knowledge sitting in your head. Don't gatekeep it. Share it to get the attention your business needs.</p>
      
      <p>Consistency beats perfection. I still get anxious before hitting publish. That anxiety means you're being real. Posting works when it's authentic, not polished. Your 573rd post matters more than your perfect first post.</p>
      
      <p>Technical depth attracts technical talent. Don't dumb down your expertise. When I share the hard problems we're working on, the right people get excited. Those are exactly the people you want to attract—whether as employees, partners, or customers.</p>
      
      <h2>Your Expertise is Waiting</h2>
      
      <p>Right now, you have knowledge in your head that could attract your next exceptional hire, save you £50K+ in recruitment fees this year, and position you as the obvious expert in your field.</p>
      
      <p>The only question is: are you going to start capturing attention for your brand?</p>
    `,
  },
  {
    id: "culture-foundational-principles",
    letter: "C",
    title: "Foundational Principles for Building a Company",
    excerpt: "In the first years of a company, you'll be so busy spinning many plates that it becomes easy to convince yourself a candidate is 'good enough'. Starting a company from scratch is a rare opportunity to consider the team characteristics you need to succeed.",
    date: "2025-12-30",
    readTime: "4 min read",
    category: "Culture",
    content: `
      <p>In the first years of a company, you'll be so busy that your head will be spinning. You'll be the CSO, the CEO, and possibly Chief Barista. Not only is there an infinite to-do list, you'll also be learning on the spot. You can no longer do everything yourself, and hiring becomes critical. But because you're so busy spinning many plates, it becomes easy to convince yourself that a candidate is "good enough".</p>
      
      <p>Starting a company from scratch is a rare opportunity to consider the team characteristics you need to succeed, and those that will make you fail. This can be a first test of leadership for a longer journey ahead.</p>
      
      <p>When it was just me rattling around an empty office, at this point in my leadership journey, three foundational principles were clear to me:</p>
      
      <ul>
        <li>A great company will have both great people and a great culture.</li>
      </ul>
      
      <p>Culture and top talent are intertwined. For me, this principle was a gateway into what comes next:</p>
      
      <ul>
        <li>The best talent seeks company cultures that give them purpose and opportunities. And if you're at the edge of innovation, it has to be a culture that brings problems to the surface so they can be solved.</li>
      </ul>
      
      <p>And that talent:</p>
      
      <ul>
        <li>Will have great character, skills, determination and the agency to solve a hard problem (the company's mission).</li>
      </ul>
      
      <p>On the surface, these are simple statements. But they are foundation principles. Almost all other principles for building a company can come from this point.</p>
      
      <p>For example, for me, integrity is a measure of great character. But I've sat in several interviews when people lie.</p>
      
      <p>5 minutes into an interview for our ~5th hire, we asked someone how big they thought the company was.</p>
      
      <p>They said "around 200 people". They didn't get the job.</p>
    `,
  },
];

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};

export const getAllBlogPostIds = (): string[] => {
  return blogPosts.map((post) => post.id);
};

