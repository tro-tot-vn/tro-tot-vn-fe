export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
} as const

console.log("[env] VITE_API_BASE_URL=", import.meta.env.VITE_API_BASE_URL)
console.log("[env] import.meta.env.MODE=", import.meta.env.MODE)
console.log("[env] loaded env keys=", Object.keys(import.meta.env).filter((key) => key.startsWith("VITE_")))

// Helper function for file URLs
export const getFileUrl = (fileId: number | string): string => {
  return `${env.API_BASE_URL}/api/files/${fileId}`
}

