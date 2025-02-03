import { Button,Table, TableBody, TableCell, TableHead, TableRow,styled } from '@mui/material'
import React from 'react'
import categories from '../../constants/data.js'


const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
    
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;
function Category() {
  return (
    <>
        <StyledButton variant="contained">Create blog</StyledButton>
        <StyledTable>
            <TableHead>
                <TableRow>
                    <TableCell>
                        All Categories
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    categories.map(category => (
                        <TableRow>
                            <TableCell>
                                {category.type}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </StyledTable>
    </>
  )
}

export default Category;