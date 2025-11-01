export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
} as const

// Helper function for file URLs
export const getFileUrl = (fileId: number | string): string => {
  return `${env.API_BASE_URL}/api/files/${fileId}`
}

