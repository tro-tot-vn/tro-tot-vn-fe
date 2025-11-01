import axios from "axios";
import provincesData from "@/data/provinces.json";
import {
  Province,
  District,
  ChoTotProvinceData,
  ChoTotWardsResponse,
} from "./types/location.types";
import { env } from "@/config/env";

class LocationVNService {
  private provinces: Province[] = [];

  constructor() {
    this.initializeProvinces();
  }

  private initializeProvinces() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = provincesData as any as ChoTotProvinceData;
    const provincesMap: Province[] = [];

    data.regions.forEach((regionObj) => {
      Object.entries(regionObj).forEach(([provinceId, provinceData]) => {
        const districts: District[] = [];

        provinceData.area.forEach((districtObj) => {
          Object.entries(districtObj).forEach(([districtId, districtName]) => {
            districts.push({
              id: districtId,
              name: districtName,
              provinceId: provinceId,
            });
          });
        });

        provincesMap.push({
          id: provinceId,
          name: provinceData.name,
          districts: districts,
        });
      });
    });

    this.provinces = provincesMap;
  }

  // Get all provinces
  getAllProvinces(): Province[] {
    return this.provinces;
  }

  // Get province by ID
  getProvinceById(provinceId: string): Province | undefined {
    return this.provinces.find((p) => p.id === provinceId);
  }

  // Get province by name
  getProvinceByName(name: string): Province | undefined {
    return this.provinces.find((p) => p.name === name);
  }

  // Get districts by province ID
  getDistrictsByProvinceId(provinceId: string): District[] {
    const province = this.getProvinceById(provinceId);
    return province ? province.districts : [];
  }

  // Get district by ID
  getDistrictById(districtId: string): District | undefined {
    for (const province of this.provinces) {
      const district = province.districts.find((d) => d.id === districtId);
      if (district) return district;
    }
    return undefined;
  }

  // Get district by name (within a province)
  getDistrictByName(
    provinceName: string,
    districtName: string
  ): District | undefined {
    const province = this.getProvinceByName(provinceName);
    if (!province) return undefined;
    return province.districts.find((d) => d.name === districtName);
  }

  // Get wards by district ID from backend proxy (to avoid CORS)
  async getWardsByDistrictId(districtId: string) {
    return await axios.get<ChoTotWardsResponse>(
      `${env.API_BASE_URL}/api/location/wards/${districtId}`
    );
  }
}

export default new LocationVNService();

// Legacy types for backward compatibility (if needed)
export interface ProvinceResponse {
  results: ResultProvinceResponse[];
}

export interface ResultProvinceResponse {
  province_id: string;
  province_name: string;
  province_type: string;
}

export interface DistrictResponse {
  results: ResultDistrictResponse[];
}

export interface ResultDistrictResponse {
  district_id: string;
  district_name: string;
  district_type: string;
  location: number;
  province_id: string;
}

export interface WardResponse {
  results: ResultWardResponse[];
}

export interface ResultWardResponse {
  district_id: string;
  ward_id: string;
  ward_name: string;
  ward_type: string;
}
