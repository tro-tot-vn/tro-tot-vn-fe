// Chợ Tốt Location Types

export interface Province {
  id: string;
  name: string;
  districts: District[];
}

export interface District {
  id: string;
  name: string;
  provinceId: string;
}

export interface Ward {
  id: number;
  name: string;
}

// Raw format from cho-tot.province.json
export interface ChoTotProvinceData {
  regions: Array<{
    [provinceId: string]: {
      name: string;
      area: Array<{
        [districtId: string]: string; // district name
      }>;
    };
  }>;
}

// API Response from Chợ Tốt Wards API
export interface ChoTotWardsResponse {
  code: string;
  wards: Ward[];
}

