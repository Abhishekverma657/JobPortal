import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 

const AdminJobsTable = () => {
    // const { companies,searchCompanyByText } = useSelector((store) => store.company);
    // const [filterCompany, setFilterCompany] = useState(companies)
    const navigate=useNavigate()
     const {searchJobByText, allAdminJobs}=useSelector(store=>store.job);
     const [filterJobs, setFilterJobs] = useState(allAdminJobs)

 

     useEffect(()=>{
        const filteredJobs=allAdminJobs.length>=0&&allAdminJobs.filter((job)=>{
         if(!searchJobByText){
            return true
         }
         return job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())||job?.title.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJobs(filteredJobs)

     },[allAdminJobs,searchJobByText])
    return (
        <div className="w-full p-4">
            <Table className="w-full">
                <TableCaption className="text-gray-600">
                    A list of your recent Posted Job
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Company</TableHead>
                        <TableHead className="text-left">Role</TableHead>
                        <TableHead className="text-left">Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No Company listed
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs?.map((job) => (
                            <TableRow key={job._id}>
                                
                               

                                {/* Name */}
                                <TableCell className="text-gray-900 font-medium">
                                    {job?.company?.name}
                                </TableCell>
                                <TableCell className="text-gray-900 font-medium">
                                    {job?.title}
                                </TableCell>

                                {/* Date */}
                                <TableCell className="text-gray-500">   {new Date(job.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}</TableCell>

                                {/* Action */}
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-fit">
                                            <div onClick={()=>navigate(`/admin/company/${job._id}`)}
                                             className="flex items-center gap-3 cursor-pointer">
                                                <Edit2 width={20} />
                                                <span>Edit</span>
                                            </div>
                                             <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className=' flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye/>
                                                <span>Applicants</span>
                                             </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
