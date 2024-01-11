# e-posting
e-posting

## Endpoint Functionality

### Dropdown Filters & Selections

| Selection                             | Options                              |
| ------------------------------------- | ------------------------------------ |
| Work Location Type = workLocationType | Onsite, Remote, Hybrid               |
| Employment Type = employmentType      | Full Time, Part Time, Contract       |
| Experience Level = yearsOfExperience  | Entry, Entry-Mid, Mid-Senior, Senior | 
| Date = closingDate                    | 24-hour, 1 week, 2 week, 4 weeks     |

### User Account Model

| Field                          | Type     |
| ------------------------------ | -------- |
| id                             | str      |
| email                          | str      |
| password                       | str      |
| signupDate                     | date     |
| isEmailAuthenticated           | boolean  |
| accountType                    | int      |
| accountStatus                  | str      |
| role                           | str      |
| accountSettings                | str      |
| lastActive                     | date     |
| provider                       | str      |
| profile                        | str      |
| favorites                      | str      |
| following                      | str      |
| verificationToken              | str      |
| passwordResetToken             | str      |
| tokenExpirationDate            | instant  |
| failedLoginAttempts            | instant  |
| lastFailedLoginAttempt         | instant  |
| passwordRecoveryAttempts       | int      |
| lastPasswordRecoveryAttempt    | instant  |

### Profile Account Model

| Field           | Type     |
| --------------- | -------- |
| id              | str      |
| profilePicture  | str      |
| firstName       | str      |
| lastName        | str      |
| title           | str      |
| phone           | str      |
| country         | str      |
| stateOrProvince | str      |
| city            | str      |
| userSummary     | str      |
| userUrls        | str      |
| workExperience  | str      |
| skills          | str      |
| resume          | str      |
| profileStep1    | str      |
| profileStep2    | str      |
| profileStep3    | str      |
| profileStep4    | str      |

### Job Model

| Field               | Type     |
| ------------------- | -------- |
| jobOwnerId          | str      |
| jobOwner            | str      |
| jobTitle            | str      |
| description         | str      |
| company             | str      |
| companyId           | str      |
| city                | str      |
| state               | str      |
| country             | str      |
| workLocationType    | str      |
| employmentType      | str      |
| workExperience      | number   |
| yearsOfExperience   | number   |
| totalCompensation   | number   |
| skills              | str      |
| questionnaire       | str      |
| endSubmissionReason | str      |
| visibleTo           | str      |
| closingDate         | date     |
| jobPostStatus       | number   |
| favoritedCount      | number   |
| applyCount          | number   |
| viewCount           | number   |
| archiveDate         | date     |

### Job Model

| Field         | Type     |
| ------------- | -------- |
| id            | str      |
| companyName   | str      |
| ticker        | str      |
| address       | str      |
| city          | str      |
| state         | str      |
| postalCode    | Number   |
| country       | str      |
| website       | str      |
| sector        | str      |
| industry      | str      |
| companyCeo    | number   |
| companyStatus | number   |
| logo          | str      |

## My Profile Tab
---
- Method: GET
- Route: `/user/me`
- Gets the users account information

<details>
    <summary>GET</summary>

Expected Response:
```
{
    "timestamp": "2023-12-20T17:04:17.53974439",
    "status": 200,
    "success": true,
    "message": "User retrieved successfully.",
    "result": {
        "id": "657199daf5cc1d1a58e00579",
        "email": "test@eposting.com",
        "signupDate": "2023-12-07T10:09:30.360+00:00",
        "isEmailAuthenticated": true,
        "accountType": 1,
        "accountStatus": "active",
        "role": "ROLE_USER",
        "accountSettings": null,
        "lastActive": null,
        "provider": "local",
        "profile": null,
        "favorites": [],
        "following": []
    }
}
```
</details>

- Method: GET
- Route: `/user/profile`
- Gets the users profile information

<details>
    <summary>GET</summary>

Expected Response:
```
{
    "timestamp": "2023-12-20T00:24:41.3925923",
    "status": 200,
    "success": true,
    "message": "Profile retrieved successfully",
    "result": {
        "id": "657199daf5cc1d1a58e00579",
        "profilePicture": null,
        "firstName": "John",
        "lastName": "Doe",
        "title": "Cloud Database Manager",
        "phone": "111-222-3568",
        "country": "United States",
        "stateOrProvince": CA,
        "city": "San Francisco",
        "userSummary": "Managing database resiliency and managing flow of incoming and outgoing data",
        "userUrls": [
            {
                "urlName": "linkedin",
                "url": "linkedin.com/username123"
            },
            {
                "urlName": "github",
                "url": "github.com/repo1"
            }
          ],
        "workExperience": [
            {
                "experienceId": "6582acf88b21c82b9c8ece9c",
                "jobTitle": "Cloud Database Manager",
                "employmentType": "Part Time",
                "company": "ePosting",
                "workLocationType": "Remote",
                "isCurrentlyActive": true,
                "location": "USA",
                "startDate": "2020-12-20T04:21:56.040+00:00",
                "endDate": null,
                "responsibilities": "Managing Cloud Database"
            }
        ],
        "skills": [],
        "resume": null,
        "profileStep1": "complete",
        "profileStep2": "complete",
        "profileStep3": "current",
        "profileStep4": "incomplete"
    }
}
```
</details>

## My Job Postings Tab
---
- Method: GET
- Route: `/job/owner/{userId}`
- Gets the user's posted jobs by jobOwnerId(_id)
- Display only the jobTitle text
- There is pagination involved

<details>
    <summary>GET</summary>

Expected Response:
```
{
    "timestamp": "2023-12-20T17:31:29.024Z",
    "status": 200,
    "success": true,
    "result": {
        "jobs": [
            {
                "jobPostStatus": 0,
                "favoritedCount": 0,
                "applyCount": 0,
                "_id": "6564cf10d11083608e90d02e",
                "jobOwnerId": "657199daf5cc1d1a58e00579",
                "jobOwner": "John Doe",
                "jobTitle": "REMOTE Opportunity for Project Manager",
                "description": "Description:\n\nManage established processes for the implementation of prioritized backlog items across AP products, coordinating within AP Delivery agile processes and across divisions to manage activity from requirements through solution implementation.\nOversee workload capacity for the internal design team, coordinate project timelines, budgetary needs, and effectively communicate project status with multiple internal stakeholders.\nMaintain constant knowledge of current and upcoming projects and manage communication around ...",
                "company": "Akamai Technologies",
                "city": "Cambridge",
                "state": "MA",
                "country": "United States",
                "workLocationType": "Hybrid",
                "employmentType": "Full Time",
                "yearsOfExperience": 5,
                "baseSalary": 150,
                "skills": [
                    "Salesforce, Java, React JS"
                ],
                "totalCompensation": 1250,
                "visibleTo": "Everyone",
                "expireDate": "12/24/2023",
                "createdAt": "2023-11-19T23:23:00.411Z",
                "updatedAt": "2023-12-20T16:37:29.773Z",
                "closingDate": "2024-05-17T23:23:00.411Z",
                "archiveDate": "2024-06-17T16:37:29.773Z",
                "viewCount": 30,
                "questionnaire": []
            },
            {
                "jobPostStatus": 0,
                "favoritedCount": 0,
                "applyCount": 0,
                "_id": "6564cf10d11083608e90d02b",
                "jobOwnerId": "655537b0c50e7f30a07b75fe",
                "jobOwner": "William Chung",
                "jobTitle": "Technical Project Manager with Salaesforce Experience",
                "description": "Responsibilities:\n\nSingle point of contact for customer to manage all project responsibilities \nRun daily stand ups for ...",
                "company": "Adobe Inc.",
                "city": "San Jose",
                "state": "CA",
                "country": "United States",
                "workLocationType": "Remote",
                "employmentType": "Full Time",
                "yearsOfExperience": 7,
                "baseSalary": 150,
                "skills": [
                    "Salesforce, Java, React JS"
                ],
                "totalCompensation": 1000,
                "visibleTo": "Everyone",
                "expireDate": "11/24/2023",
                "createdAt": "2023-11-19T23:23:00.411Z",
                "updatedAt": "2023-12-15T08:59:46.572Z",
                "closingDate": "2024-05-17T23:23:00.411Z",
                "archiveDate": "2024-06-12T08:59:46.572Z",
                "viewCount": 25,
                "questionnaire": []
            }
        ],
        "totalJobs": 8,
        "page": 1,
        "pageSize": 2,
        "maxPages": 4,
        "offset": 0
    }
}
```
</details>

## Search Tab
---
- Method: GET
- Category: Jobs
- Route: `/job/search`
- additional parameters that can be added such as `workLocationType`, `employmentType`, `yearsOfExperience`, `closingDate`
- Gets job posts by keywords and additional query parameters
- There's pagination

<details>
    <summary>GET</summary>

Endpoint URL examples:
```
    /job/search?keyword=ado&workLocationType=Hybrid&yearsOfExperience=2&page=1
    /job/search?keyword=pm&closingDate=2-weeks&employmentType=Full Time&page=1
```

Expected Results:
```
{
    "timestamp": "2023-12-21T02:09:14.161Z",
    "status": 200,
    "success": true,
    "result": {
        "jobs": [
            {
                "jobPostStatus": 0,
                "favoritedCount": 0,
                "applyCount": 0,
                "_id": "6564cf10d11083608e90d030",
                "jobOwnerId": "656637c0c50e7f30a07b75fe",
                "jobOwner": "Zoe Leung",
                "jobTitle": "Gainsight Administrator",
                "description": "Responsibilities\n1. Understanding of Customer Success and how to streamline processes to speed adoption.\n2. Comfortable with basic programming and object...",
                "company": "Amazon.com Inc.",
                "city": "Seattle",
                "state": "WA",
                "country": "United States",
                "workLocationType": "Hybrid",
                "employmentType": "Full Time",
                "yearsOfExperience": 7,
                "baseSalary": 150,
                "skills": [
                    "Salesforce, Java, React JS"
                ],
                "totalCompensation": 1000,
                "visibleTo": "Everyone",
                "expireDate": "12/24/2023",
                "createdAt": "2023-11-19T23:23:00.411Z",
                "updatedAt": "2023-12-19T20:04:29.277Z",
                "closingDate": "2024-05-17T23:23:00.411Z",
                "archiveDate": "2024-06-16T20:04:29.277Z",
                "viewCount": 4,
                "questionnaire": []
            },
            {
                "jobPostStatus": 0,
                "favoritedCount": 0,
                "applyCount": 0,
                "_id": "6564cf10d11083608e90d059",
                "jobOwnerId": "656637c0c50e7f30a07b75fe",
                "jobOwner": "Zoe Leung",
                "jobTitle": "Gainsight Cloud Administrator",
                "description": "Responsibilities\n1. Understanding of Customer Success and how to streamline processes to speed adoption.\n2...",
                "company": "Amazon.com Inc.",
                "city": "Seattle",
                "state": "WA",
                "country": "United States",
                "workLocationType": "Hybrid",
                "employmentType": "Full Time",
                "yearsOfExperience": 7,
                "baseSalary": 150,
                "skills": [
                    "Salesforce, Java, React JS"
                ],
                "totalCompensation": 1000,
                "visibleTo": "Everyone",
                "expireDate": "12/24/2023",
                "createdAt": "2023-11-19T23:23:00.411Z",
                "updatedAt": "2023-12-17T03:06:22.376Z",
                "closingDate": "2024-05-17T23:23:00.411Z",
                "archiveDate": "2024-06-14T03:06:22.376Z",
                "viewCount": 5,
                "questionnaire": []
            }
        ],
        "totalJobs": 2,
        "page": 1,
        "pageSize": 20,
        "maxPages": 1,
        "offset": 0
    }
}
```
</details>

- Method: GET
- Category: Companies
- Route: `/company/search`
- additional parameters that can be added such as `workLocationType`, `employmentType`, `yearsOfExperience`, `closingDate`
- Gets job posts by keywords and additional query parameters
- There's pagination

<details>
    <summary>GET</summary>

Endpoint URL examples:
```
/company/search?companyName=co&page=1
```

Expected Results:
```
{
    "timestamp": "2023-12-21T02:13:03.662Z",
    "status": 200,
    "success": true,
    "result": {
        "companies": [
            {
                "companyStatus": 1,
                "_id": "65815031a714858bce26d9a3",
                "companyName": "Amazon.com Inc.",
                "ticker": "AMZN",
                "address": "410 Terry Ave N",
                "city": "Seattle",
                "state": "WA",
                "postalCode": 98109,
                "country": "United States",
                "website": "http://www.amazon.com",
                "sector": "Retail/E-commerce",
                "industry": "Internet Services and Retail",
                "ceo": "Andy Jassy",
                "logo": "https://epost-template-bucket.s3.us-west-1.amazonaws.com/Company+Logos/amazon_logo.png"
            },
            ...
            {
                "companyStatus": 1,
                "_id": "65815031a714858bce26d9ba",
                "companyName": "Confluent",
                "ticker": "CFLT",
                "address": "N/A",
                "city": "Mountain View",
                "state": "CA",
                "postalCode": 94041,
                "country": "United States",
                "website": "https://www.confluent.io",
                "sector": "Technology",
                "industry": " Software",
                "ceo": " Jay Kreps",
                "logo": "https://epost-template-bucket.s3.us-west-1.amazonaws.com/Company+Logos/Confluent_logo.png"
            }
        ],
        "totalCompanies": 38,
        "page": 1,
        "pageSize": 20,
        "maxPages": 2,
        "offset": 0
    }
}
```
</details>

### Company by Company Id
---
- Method: GET
- Route: `/company/{id}`
- Gets company by it's id

<details>
    <summary>GET</summary>

Example of expected result:
```
{
    "timestamp": "2023-12-21T03:03:52.606Z",
    "status": 200,
    "success": true,
    "result": {
        "companyStatus": 1,
        "_id": "65815031a714858bce26d9a3",
        "companyName": "Amazon.com Inc.",
        "ticker": "AMZN",
        "address": "410 Terry Ave N",
        "city": "Seattle",
        "state": "WA",
        "postalCode": 98109,
        "country": "United States",
        "website": "http://www.amazon.com",
        "sector": "Retail/E-commerce",
        "industry": "Internet Services and Retail",
        "ceo": "Andy Jassy",
        "logo": "https://epost-template-bucket.s3.us-west-1.amazonaws.com/Company+Logos/amazon_logo.png"
    }
}
```
</details>

### Edit/Put company by id
---
- Method: PUT
- Route: `/company/{id}`
- Updates company by it's id

<details>
    <summary>PUT</summary>

Example JSON body:
```
{
    "companyName": "Amazon.com Inc.",
    "ticker": "MNA",
    "address": "777 Lucky Street",
    "city": "San Francisco",
    "state": "CA",
    "postalCode": "99999",
}
```

Expected results:
```
{
    "timestamp": "2023-12-21T03:16:34.101Z",
    "status": 200,
    "success": true,
    "result": {
        "_id": "6583ad373e69fa9489a4a820",
        "companyName": "Amazon.com Inc.",
        "ticker": "MNA",
        "address": "777 Lucky Street",
        "city": "San Francisco",
        "state": "CA",
        "postalCode": 99999,
        "country": "United States",
        "website": "http://www.amazon.com",
        "sector": "Retail/E-commerce",
        "industry": "Internet Services and Retail",
        "companyStatus": 1,
        "logo": "https://epost-template-bucket.s3.us-west-1.amazonaws.com/Company+Logos/amazon_logo.png"
    }
}
```
</details>

### Delete company by id
---
- Method: DELETE
- Route: `/company/{id}`
- Deletes a company by it's id

<details>
    <summary>DELETE</summary>

Expected results:
```
{
    "timestamp": "2023-12-21T03:19:45.552Z",
    "status": 200,
    "success": true,
    "message": "Successfully removed company"
}
```
</details>

### Job Post details by Job Post id(_id)
---
- Method: GET
- Route: `/job/{id}`
- Gets the user's posted jobs

<details>
    <summary>GET</summary>

Expected Response:
```
{
    "timestamp": "2023-12-20T17:44:27.455Z",
    "status": 200,
    "success": true,
    "result": {
        "_id": "6564cf10d11083608e90d02e",
        "jobOwnerId": "655537b0c50e7f30a07b75fe",
        "jobOwner": "William Chung",
        "jobTitle": "REMOTE Opportunity for Project Manager",
        "description": "Description:\n\nManage established processes for the implementation of prioritized backlog items across AP products, coordinating within AP Delivery agile processes and across divisions to manage activity from requirements through solution implementation.\nOversee workload capacity for the internal design team, coordinate project timelines, budgetary needs, and effectively communicate project status with multiple internal stakeholders.\nMaintain constant knowledge of current and upcoming projects and manage communication around shifting priorities with key stakeholders to ensure positive workflow.\nUtilize principles of project management and agile practices to achieve pace and maintain flexibility, promoting transparency and aligned stakeholder understanding, including\nRunning daily standup meetings with associated teams to track progress, assess risks, and stay consistently informed on the progress of all projects. Resolve any issues with appropriate stakeholders.\nProduce reporting that speaks to the teams' output and capacity.\nMaintain Jira tickets and Smartsheet progress tracker in support of multiple projects, while making suggestions for improvements and efficiencies.\nEngage with internal and external stakeholders to generate project estimates, scope or budget as necessary, and manage purchase orders, approvals, invoices and tracking in relation to projects produced through Vendor Management.\nProactively drive process improvements that will enable the teams to be efficient and ensure quality.\nEnhance and formalize standard operating procedures and capacity forecasting, while driving awareness of processes and planning protocol for work requests.\nAnalyze options with a particular focus on rapid clarification and resolution of complex or emergent issues, including costs, challenges, benefits, and recommended course of action and/or key open questions\nQualifications:\n\nDemonstrated experience in project management, including agile practices and active collaboration with product managers and owners.\nUnderstanding of end-to-end creative development processes and best practices, a plus.. Multi-media experience is a plus.\nStrong planning, scheduling, cost management, and reporting skills required\nDemonstrated experience balancing multiple diverse projects with competing demands for scope, time, cost, and risk, with a limited pool of resources.\nExperience in creative resource management and proficient in project management tools (i.e. Smartsheet, Microsoft Office, Jira, etc.). Agency experience a plus.\nDemonstrated ability to plan and implement solutions, both end-to-end at the tactical scale, and through developing requirements for larger initiatives\nFacility with data collection, aggregation of evidence, analysis, and interpretation, including practical applications to inform business and solution decisions and recommendations\nExcellent verbal and written communications clear, compelling, and persuasive in your communications with the ability to build strong working relationships with other teams in the organization.\nAbility to work well with staff at all organizational levels, vendors/partners, and educators\nStrong, yet kind interpersonal management skills with the ability to understand, motivate, inspire trust, and build rapport with peers and leadership.\nAffinity for being a team player eager to troubleshoot challenges, share your knowledge, and learn from others\nStrongly preferred: Experience with the Advanced Placement Program, or in education or school management",
        "company": "Akamai Technologies",
        "city": "Cambridge",
        "state": "MA",
        "country": "United States",
        "workLocationType": "Hybrid",
        "employmentType": "Full Time",
        "yearsOfExperience": 5,
        "baseSalary": 150,
        "skills": [
            "Salesforce, Java, React JS"
        ],
        "totalCompensation": 1250,
        "visibleTo": "Everyone",
        "jobPostStatus": 0,
        "favoritedCount": 0,
        "applyCount": 0,
        "expireDate": "12/24/2023",
        "createdAt": "2023-11-19T23:23:00.411Z",
        "updatedAt": "2023-12-20T16:37:29.773Z",
        "closingDate": "2024-05-17T23:23:00.411Z",
        "archiveDate": "2024-06-17T16:37:29.773Z",
        "viewCount": 30,
        "questionnaire": []
    }
}
```
</details>

### Edit/Put Job Post by Job Post id(_id)
---
- Method: PUT
- Route: `/job/{id}`
- Updates the user's posted jobs

<details>
    <summary>PUT</summary>

JSON body Input Example:
```
{
    "description": "Testing json body"
}
```

Expected Response:
```
{
    "timestamp": "2023-12-20T17:44:27.455Z",
    "status": 200,
    "success": true,
    "result": {
        "_id": "6564cf10d11083608e90d02e",
        "jobOwnerId": "655537b0c50e7f30a07b75fe",
        "jobOwner": "William Chung",
        "jobTitle": "REMOTE Opportunity for Project Manager",
        "description": "Testing json body",
        "company": "Akamai Technologies",
        "city": "Cambridge",
        "state": "MA",
        "country": "United States",
        "workLocationType": "Hybrid",
        "employmentType": "Full Time",
        "yearsOfExperience": 5,
        "baseSalary": 150,
        "skills": [
            "Salesforce, Java, React JS"
        ],
        "totalCompensation": 1250,
        "visibleTo": "Everyone",
        "jobPostStatus": 0,
        "favoritedCount": 0,
        "applyCount": 0,
        "expireDate": "12/24/2023",
        "createdAt": "2023-11-19T23:23:00.411Z",
        "updatedAt": "2023-12-20T16:37:29.773Z",
        "closingDate": "2024-05-17T23:23:00.411Z",
        "archiveDate": "2024-06-17T16:37:29.773Z",
        "viewCount": 30,
        "questionnaire": []
    }
}
```
</details>

### Delete Job Post by Job Post id(_id)
---
- Method: DELETE
- Route: `/job/{id}`
- Deletes post by id

<details>
    <summary>DELETE</summary>

Expected Response:
```
{
    "timestamp": "2023-12-20T17:58:22.801Z",
    "status": 200,
    "success": true,
    "message": "Successfully removed job post"
}
```
</details>