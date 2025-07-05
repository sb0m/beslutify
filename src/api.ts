/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export interface ApicoResponse {
  values: any;
  data: {
    records: Array<{
      Date: string;
      Weight: number;
    }>;
  };
}

export interface WeightData {
  date: number;
  weight: number;
}

// const ACCESS_TOKEN =
//   "a850aeb40ed1c59efae5b123c9fcd4e43c573d99ab79d83fd3fefbe9c576680d";
const APICO_BASE_URL = "https://api.apico.dev/v1/cUa5KM";
const SHEET_ID = "1fkazM-Q2a8EfVcQ6qbVS9qkKdmtM-5Wd5046IHTnh90";

// const API_GET_ENDPOINT = (sheet_name: string) =>
//   `${APICO_BASE_URL}/${SHEET_ID}/values/${sheet_name}`;
// const API_POST_ENDPOINT = (sheet_name: string) =>
//   `${APICO_BASE_URL}/${SHEET_ID}/values/${sheet_name}:append`;
// const API_PUT_ENDPOINT = (sheet_name: string) =>
//   `${APICO_BASE_URL}/${SHEET_ID}/values/${sheet_name}!`;

export async function getDecisionSubjects(): Promise<string[]> {
  try {
    const response = await axios.get<ApicoResponse>(
      `${APICO_BASE_URL}/${SHEET_ID}`
    );

    // @ts-expect-error huhu
    return response.data.sheets.map((sheet: any) => sheet.properties.title);
  } catch (error) {
    console.error("Error fetching weight data from API:", error);
    throw error;
  }
}

export async function getOptionsBySubject(subject: string): Promise<string[]> {
  try {
    const response = await axios.get<ApicoResponse>(
      `${APICO_BASE_URL}/${SHEET_ID}/values/${subject}`
    );

    return response.data.values.map((row: any[]) => row[0]);
  } catch (error) {
    console.error("Error fetching weight data from API:", error);
    throw error;
  }
}

// export async function saveWeightData(
//   date: Date,
//   weight: number
// ): Promise<void> {
//   try {
//     const formattedDate = date.toISOString().split("T")[0];

//     const payload = {
//       values: [[formattedDate, weight.toString()]],
//       majorDimension: "ROWS",
//     };

//     const response = await axios.post(
//       `${API_POST_ENDPOINT}?valueInputOption=USER_ENTERED`,
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Data saved successfully:", response.data);
//   } catch (error) {
//     console.error("Error saving weight data to API:", error);
//     throw error;
//   }
// }

// export async function updateWeightData(
//   index: number,
//   date: Date,
//   weight: number
// ): Promise<void> {
//   try {
//     const formattedDate = date.toISOString().split("T")[0];

//     const payload = {
//       values: [[formattedDate, weight.toString()]],
//       majorDimension: "ROWS",
//     };

//     const response = await axios.put(
//       `${API_PUT_ENDPOINT}A${index + 2}:B${
//         index + 2
//       }?valueInputOption=USER_ENTERED`,
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${ACCESS_TOKEN}`,
//         },
//       }
//     );

//     console.log("Data updated successfully:", response.data);
//   } catch (error) {
//     console.error("Error updating weight data to API:", error);
//     throw error;
//   }
// }
