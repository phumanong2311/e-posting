import { Table } from '@mantine/core'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useAppProviderCtx } from '../../app-provider'

export const ListContentActive = () => {
  const {
    data: { dataContentManagementTemp },
  } = useAppProviderCtx()
  const navigate = useNavigate()

  const rows = dataContentManagementTemp ? dataContentManagementTemp.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td
        className="text-ellipsis cursor-pointer"
        // onClick={() => onViewDetail(element._id)}
      >
        {element.title}
      </Table.Td>
      <Table.Td className="text-center">{element.type}</Table.Td>
      <Table.Td className="text-center">{element.createdBy}</Table.Td>
      <Table.Td className="text-center">{element.lastModifiedBy}</Table.Td>
      <Table.Td className="text-center">{element.status}</Table.Td>
      <Table.Td className="text-center">
        {moment(element.publishDate).format('MM/DD/YYYY')}
      </Table.Td>
      <Table.Td className="text-center">
        {moment(element.endDate).format('MM/DD/YYYY')}
      </Table.Td>
    </Table.Tr>
  )) : []
  return (
    <div className="w-full px-14 mt-5">
      <Table withRowBorders={false} verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th className="text-center">Type</Table.Th>
            <Table.Th className="text-center">Created By</Table.Th>
            <Table.Th className="text-center">Last Modified By</Table.Th>
            <Table.Th className="text-center">Status</Table.Th>
            <Table.Th className="text-center">Publish Date</Table.Th>
            <Table.Th className="text-center">End Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  )
}

export default ListContentActive
