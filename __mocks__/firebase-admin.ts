export const auth = jest.fn().mockImplementation(() => ({
  verifyIdToken: () => ({
    name: 'Al Good',
    email: 'frank@autofi.io',
  })
}))
