import { faker } from '@faker-js/faker'

export function generateFakeApplications(count = 10) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    company: faker.company.name(),
    position: faker.person.jobTitle(),
    status: faker.helpers.arrayElement(['APPLIED', 'INTERVIEWING', 'OFFER']),
    createdAt: faker.date.recent(),
    // ... other fields
  }))
}
