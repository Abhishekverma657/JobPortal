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
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 

const CompaniesTable = () => {
    const { companies,searchCompanyByText } = useSelector((store) => store.company);
    const [filterCompany, setFilterCompany] = useState(companies)
    const navigate=useNavigate()






     useEffect(()=>{
        const filteredCompany=companies.length>=0&&companies.filter((company)=>{
         if(!searchCompanyByText){
            return true
         }
         return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompany)

     },[companies,searchCompanyByText])
    return (
        <div className="w-full p-4">
            <Table className="w-full">
                <TableCaption className="text-gray-600">
                    A list of your registered companies
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Logo</TableHead>
                        <TableHead className="text-left">Name</TableHead>
                        <TableHead className="text-left">Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No Company listed
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany?.map((company) => (
                            <TableRow key={company._id}>
                                {/* Logo */}
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage
                                            src={company.logo}
                                            alt="Company Logo"
                                        />
                                    </Avatar>
                                </TableCell>

                                {/* Name */}
                                <TableCell className="text-gray-900 font-medium">
                                    {company.name}
                                </TableCell>

                                {/* Date */}
                                <TableCell className="text-gray-500">   {new Date(company.createdAt).toLocaleDateString('en-US', {
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
                                            <div onClick={()=>navigate(`/admin/company/${company._id}`)}
                                             className="flex items-center gap-3 cursor-pointer">
                                                <Edit2 width={20} />
                                                <span>Edit</span>
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

export default CompaniesTable;
