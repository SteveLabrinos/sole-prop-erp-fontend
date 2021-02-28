import React from 'react';

import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../../UI/Title/Title';

/**
 * @returns {JSX.Element}
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 28/2/2021.
 */


function createData(month, amount) {
    return { month, amount };
}

const data = [
    createData('2020-0', 0),
    createData('2020-09', 124),
    createData('2020-10', 62),
    createData('2020-11', 62),
    createData('2020-12', 124),
    createData('2021-01', 458.8),
    createData('2021-02', 320.4),
];


export default function TransactionChart({ title }) {
    const theme = useTheme();
    console.log(data);
    return (
        <React.Fragment>
            <Title>{title}</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="month" stroke={theme.palette.text.secondary} fontSize={10} />
                    <YAxis stroke={theme.palette.text.secondary} fontSize={10}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Έσοδα (€)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}