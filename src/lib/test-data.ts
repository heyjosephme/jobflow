import { faker } from "@faker-js/faker";
import { ApplicationStatus, JobType } from "@prisma/client";

// Import the type we created earlier
import type { ApplicationWithRelations } from "@/lib/types";

function generateRealisticDates() {
  const appliedDate = faker.date.recent({ days: 30 });
  const createdAt = new Date(appliedDate);
  const updatedAt = faker.date.between({
    from: appliedDate,
    to: new Date(),
  });

  return { appliedDate, createdAt, updatedAt };
}

export function generateFakeApplications(
  count = 9,
): ApplicationWithRelations[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    jobTitle: faker.person.jobTitle(),
    status: faker.helpers.enumValue(ApplicationStatus),
    appliedDate: faker.date.recent({ days: 30 }),
    link: faker.internet.url(),
    description: faker.lorem.paragraph(),
    salary: `$${faker.number.int({ min: 50, max: 200 })}k/year`,
    location: `${faker.location.city()}, ${faker.location.state()}`,
    jobType: faker.helpers.enumValue(JobType),
    createdAt: faker.date.recent({ days: 60 }),
    updatedAt: faker.date.recent({ days: 10 }),
    userId: faker.string.uuid(),
    companyId: faker.string.uuid(),

    // Related data
    company: {
      id: faker.string.uuid(),
      name: faker.company.name(),
      website: faker.internet.url(),
      industry: faker.company.buzzPhrase(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },

    notes: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
      id: faker.string.uuid(),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      userId: faker.string.uuid(),
      applicationId: faker.string.uuid(),
    })),
  }));
}
