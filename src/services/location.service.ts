import axios from "axios";

class LocationVNService {
  async getAllProvinces() {
    return await axios.get<ProvinceResponse>(
      "https://vapi.vnappmob.com/api/v2/province/",
      {
        headers: {
          Accept: "*/*",
        },
      }
    );
  }
  async getDistrictsByProvinceId(provinceId: string) {
    return await axios.get<DistrictResponse>(
      `https://vapi.vnappmob.com/api/v2/province/district/${provinceId}`,
      {
        headers: {
          Accept: "*/*",
        },
      }
    );
  }
  async getWardsByDistrictId(districtId: string) {
    return await axios.get<WardResponse>(
      `https://vapi.vnappmob.com/api/v2/province/ward/${districtId}`,
      {
        headers: {
          Accept: "*/*",
        },
      }
    );
  }
}
export default new LocationVNService();

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
