import { Tabs } from "@mantine/core";
import { UserReportingTab } from "./UserReportingTab";
import { UserMisConductTab } from "./UserMisconductTab";

const UserConductManagerPage = () => {
  const tabs = [
    {
      value: "userReporting",
      label: "User Reporting",
      component: <UserReportingTab />,
    },
    {
      value: "userMisConduct",
      label: "User Misconduct",
      component: <UserMisConductTab />,
    },
  ];
  return (
    <div className="w-full h-full mt-6 px-16">
      <Tabs defaultValue={tabs[0].value}>
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Panel key={tab.value} value={tab.value}>
            {tab.component}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};
export default UserConductManagerPage;
