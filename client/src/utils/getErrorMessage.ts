export function getErrorMessage(error: unknown): string {
  const err = error as { response?: { data?: { error?: string } } }
  if (err.response?.data?.error) return err.response.data.error
  if (error instanceof Error) return error.message
  return 'Something went wrong'
}
