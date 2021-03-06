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
  district: {
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
  capacity: {
    S: string;
  };
  name: {
    S: string;
  };
};
