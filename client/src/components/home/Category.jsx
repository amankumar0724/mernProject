import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material';
import React from 'react';
import categories from '../../constants/data.js';
import { Link, useSearchParams } from 'react-router-dom';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
    border-collapse: separate; /* Prevent cells from merging borders */
    border-spacing: 0;         /* Eliminate any gaps between cells */
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

// Increase text size here without affecting the cell's overall dimensions
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    font-size: 1rem; /* increased text size */
    display: block;
    width: 100%;
    height: 100%;
    line-height: 40px; /* match the fixed cell height for vertical centering */
`;

// Set a fixed height for table cells to prevent resizing,
// and adjust padding to ensure consistency.
const HoverTableCell = styled(TableCell)`
    border: 2px solid transparent;
    transition: border-color 0.3s ease-in-out;
    box-sizing: border-box;
    height: 40px;   /* fixed height */
    padding: 0;     /* remove extra padding */
    text-align: center;
    
    &:hover {
        color: #c04f4f;
        border-color: #c04f4f;
    }
`;

function Category() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <>
            <Link to={`/create-post?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create blog</StyledButton>
            </Link>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <HoverTableCell>
                            <StyledLink to='/'>
                                All Categories
                            </StyledLink>
                        </HoverTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map(category => (
                        <TableRow key={category.id}>
                            <HoverTableCell>
                                <StyledLink to={`/?category=${category.type}`}>
                                    {category.type}
                                </StyledLink>
                            </HoverTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    );
}

export default Category;
