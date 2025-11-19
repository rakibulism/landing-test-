export interface VisaOption {
  country: string;
  flag: string;
  title: string;
  description: string;
}

export interface ServicePoint {
  title: string;
  points: string[];
}

export interface Testimonial {
  role: string;
  path: string;
  outcome: string;
}

export type UserType = 'founder' | 'company' | null;

export interface QuizState {
  userType: UserType;
  markets: string[];
  stage: string;
  funding: string;
  teamSize: string;
  citizenship: string;
  name: string;
  email: string;
  residence: string;
  whatsapp?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  type?: 'text' | 'options' | 'input' | 'multi-select' | 'form' | 'loading';
  options?: string[];
  multiOptions?: string[];
  inputType?: string; // e.g., 'text', 'email'
  isFinal?: boolean;
}
