import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core';
import { getFirstLetters } from '../../shared/utility';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 23/2/21.
 */

const useStyles = makeStyles(theme => ({
    avDisplay: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.main
    }
}));

export default function Representatives({ repList }) {
    const classes = useStyles();

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {repList.map(rep => (
                        <TableRow key={rep.id}>
                            <TableCell component="th" scope="row">
                                <Avatar className={classes.avDisplay}>
                                    {getFirstLetters(rep.name)}
                                </Avatar>
                            </TableCell>
                            <TableCell align="left">
                                {rep.name}
                            </TableCell>
                            <TableCell align="center">
                                <Link href={'tel:' + rep.phoneNumber}>
                                    {rep.phoneNumber}
                                </Link>
                            </TableCell>
                            <TableCell align="center">
                                {rep.activity}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}