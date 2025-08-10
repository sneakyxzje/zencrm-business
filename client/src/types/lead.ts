export type LeadStatus = "NEW" | "IN_PROGRESS" | "DONE";

export type UserLite = {
  id: number;
  fullname: string;
};

export type Lead = {
  id: number;
  phoneNumber: string;
  assignee: UserLite | null;
  createdBy?: UserLite | null;
  status: LeadStatus;
  createdAt: string;
  note: string | null;
};
