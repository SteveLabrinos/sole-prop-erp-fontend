import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 21/2/21.
 */

//  missing CRUD operations on bank accounts

export default function BackAccount({ accounts }) {
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {accounts.map(account => (
                        <TableRow key={account.iban}>
                            <TableCell component="th" scope="row">
                                {account.bankName}
                            </TableCell>
                            <TableCell align="center">
                                {account.swiftCode}
                            </TableCell>
                            <TableCell align="center">
                                {account.iban}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}