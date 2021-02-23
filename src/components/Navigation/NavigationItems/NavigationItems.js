import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

/**
 * @returns {JSX.Element}
 * @author Stavros Labrinos [stalab at linuxmail.org] on 19/2/21.
 */

export default function NavigationItems () {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Αρχική</NavigationItem>
            <NavigationItem link="/entities">Συναλλασόμενοι</NavigationItem>
            <NavigationItem link="/items">Υπηρεσίες</NavigationItem>
            <NavigationItem link="/priceLists">Τιμοκατάλογοι</NavigationItem>
            <NavigationItem link="/invoices">Παραστατικά</NavigationItem>
            <NavigationItem link="/transactions">Συναλλαγές</NavigationItem>
            <NavigationItem link="/reports">CRM Reports</NavigationItem>
        </ul>
    );
}