import React from 'react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge' // Assuming you have a Badge component
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
   const {allAppliedJobs}=useSelector(store=>store.job)
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <TableCaption>A List of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.lenght<=0?<span>You have not applied any job yet</span>: allAppliedJobs.map((appliedJob, indx) => (
              <TableRow key={appliedJob?._id}>
                <TableCell className="text-gray-500">   {new Date(appliedJob.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="success" className={`${appliedJob?.status==='rejected'?'bg-red-300':appliedJob?.status==='accepted'?'bg-green-200':'bg-yellow-100'}`}>{appliedJob?.status.toUpperCase()}</Badge>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </table>
    </div>
  )
}

export default AppliedJobTable;
