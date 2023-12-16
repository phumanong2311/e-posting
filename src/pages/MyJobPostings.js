import { Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const MyJobPostingsPage = () => {
  const data = [
    {
      description: "Urgent Senior Project Manager with Fortune in 500 client",
      postedDate: "2/24/2025",
      status: "0",
      role: 2,
    },
    {
      description: "Urgent Senior Project Manager with Fortune in 500 client",
      postedDate: "2/24/2025",
      status: "0",
      role: 2,
    },
    {
      description: "Urgent Senior Project Manager with Fortune in 500 client",
      postedDate: "2/24/2025",
      status: "0",
      role: 2,
    },
    {
      description: "Urgent Senior Project Manager with Fortune in 500 client",
      postedDate: "2/24/2025",
      status: "0",
      role: 2,
    },
    {
      description: "Urgent Senior Project Manager with Fortune in 500 client",
      postedDate: "2/24/2025",
      status: "0",
      role: 2,
    },
  ];

  const rows = data.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element.description}</Table.Td>
      <Table.Td className="text-center">{element.postedDate}</Table.Td>
      <Table.Td className="text-center">{element.status}</Table.Td>
      <Table.Td className="flex gap-2 justify-center items-center">
        {element.role > 0 && <IconEdit />}
        {element.role > 1 && <IconTrash />}
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="w-full px-14 mt-5">
      <Table withRowBorders={false} verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Description/Job Title</Table.Th>
            <Table.Th className="text-center">Posted date</Table.Th>
            <Table.Th className="text-center">Status</Table.Th>
            <Table.Th className="text-center">Admin</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <p className="absolute right-16 bottom-16 text-purple-800">
        next page &gt;{" "}
      </p>
    </div>
  );
};

export default MyJobPostingsPage;
