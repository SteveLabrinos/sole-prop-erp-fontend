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
    createData('2020-06', 0),
    createData('2020-07', 1796.05),
    createData('2020-08', 25279.53),
    createData('2020-09', 34513.85),
    createData('2020-10', 33365.95),
    createData('2020-11', 45446.87),
    createData('2020-12', 39811.5),
    createData('2021-01', 31580.74),
    createData('2021-02', undefined),
];


export default function TransactionChart({ title }) {
    const theme = useTheme();

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