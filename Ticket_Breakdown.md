# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
### Asumption
- The facility can only create one custom id for an agent at a time that is new custum id will replace old custom id
- The shift table contain the internal agent id and the internal facility id
- The facility must be authenticated before creating an agent or generating a report
- Multiple facilities can create custom id for an agent, but no 2 agent can have the same custom id but it is possible for an agent to have the ame custom id  with multiple facilities
- The database is SQL
 

### Tasks

#### TASK 1:  Create a new table called agent_custom_ids to store the agent custom id in a facility 

##### Details
- Create a new table called `agent_custom_ids` with the following fields
    - id unsigned integer
    - agent_id unsigned integer (referencing id in Agents table)
    - facility_id unsigned integer (referencing id in Facilities table)
    - custom_id string
    - composite unique index (facility_id, custom_id)

##### Time
  3 hours

#### Task 2:  Create a `saveAgentCustomId` function 

##### Details
  `isCustomIdUniqueInFacility` takes 2 parameters which are `facility_id` and `custom_id` then returns a `boolean`. It should be use to check custom id already exist in the facility
  `getAgentFacilityCustomId` takes 2 parameters which are `agent_id` and `facility_id` then return `null` or `id`. It should be use to get the internal id in the `agent_custom_ids` table
  `saveAgentCustomId` takes 3 parameters which are `agent_id`, `facility_id` and `custom_id`. It should use `isCustomIdUniqueInFacility` to check if the custom_id does not exist in the facility. if the custom_id aleady exist **throw an error with custom_id already exist** but if does not exist then call `getAgentFacilityCustomId` to know if the agent already have custom_id, an internal id is return and the custom_id should be updated but if it returns `null` then custom_id should be created for the agent in the facility 

##### Time
  4 hours

#### Task 3: Create a `getShiftsByFacilityAndAgent` and `getTotalShifts` funtion

##### Details
  `getShiftsByFacilityAndAgent` takes 3 parameters which are `agent_id`,`facility_id` and `date object ({start, end})`then return an array of shifts the agent did within the date range of start and end.
  `getTotalShiftsHours` takes the return from `getShiftsByFacilityAndAgent` and sum all the hours of shifts. You can use [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) or any methods

##### Time
  3 hours  

#### Task 4: Create a `generateReportByCustomId` function

##### Details
For backward compatibility for pdf report generation `generateReport` should not be change, `generateReportByCustomId` takes 2 paramters which are `custom_i`d and `date object ({start, end})` should handle the generating of pdf report using custom id. The custom id should be use to get the `agent_id` and `facility_id` then use `getShiftsByFacilityAndAgent` to get quater shifts for the facility and generate the pdf report using custom_id as the name of the file

##### Time
  2 hours

