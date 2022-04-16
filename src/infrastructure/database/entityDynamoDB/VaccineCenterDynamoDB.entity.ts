export type VaccineCenterDynamoDB = {
  id: {
    S: string;
  };
  vaccines: {
    L: { S: string }[];
  };
  diris: {
    S: string;
  };
  created_at: {
    S: string;
  };
  business_hour: {
    S: string;
  };
  distrito: {
    S: string;
  };
  localization: {
    S: string;
  };
  direction: {
    S: string;
  };
  is_available: {
    BOOL: boolean;
  };
  name: {
    S: string;
  };
};