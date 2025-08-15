import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";

// Dummy data for preview
const PREVIEW_DATA = {
    monthlyReport: {
        userName: "Chukwudi Okeke",
        type: "monthly-report",
        data: {
            month: "December",
            stats: {
                totalIncome: 5000000,
                totalExpenses: 3500000,
                byCategory: {
                    rent: 1500000,
                    foodstuff: 600000,
                    transport: 400000,
                    owambe: 300000,
                    bills: 700000,
                },
            },
            insights: [
                "Your rent na 43% of your total spending - e fit make sense to check cheaper options for Lagos or Abuja.",
                "Well done keeping owambe spending low this month!",
                "Try set up auto-savings to keep 20% more of your income for future plans.",
            ],
        },
    },
    budgetAlert: {
        userName: "Chukwudi Okeke",
        type: "budget-alert",
        data: {
            percentageUsed: 85,
            budgetAmount: 4000000,
            totalExpenses: 3400000,
        },
    },
};

export default function EmailTemplate({
    userName = "",
    type = "monthly-report",
    data = {},
}) {
    if (type === "monthly-report") {
        return (
            <Html>
                <Head />
                <Preview>Your Monthly Lejar Report</Preview>
                <Body style={styles.body}>
                    <Container style={styles.container}>
                        <Heading style={styles.title} as="h1">
                            Monthly Lejar Report
                            <div style={styles.titleUnderline}></div>
                        </Heading>

                        <Text style={styles.text}>Hello {userName},</Text>
                        <Text style={styles.text}>
                            See how your money dey work for {data?.month}:
                        </Text>

                        {/* Main Stats */}
                        <Section style={styles.statsContainer} aria-label="Financial summary">
                            <div style={styles.stat}>
                                <Text style={styles.text}>Total Income</Text>
                                <Text style={styles.heading}>₦{data?.stats.totalIncome.toLocaleString()}</Text>
                            </div>
                            <div style={styles.stat}>
                                <Text style={styles.text}>Total Expenses</Text>
                                <Text style={styles.heading}>₦{data?.stats.totalExpenses.toLocaleString()}</Text>
                            </div>
                            <div style={styles.stat}>
                                <Text style={styles.text}>Net Balance</Text>
                                <Text style={styles.heading}>
                                    ₦{(data?.stats.totalIncome - data?.stats.totalExpenses).toLocaleString()}
                                </Text>
                            </div>
                        </Section>

                        {/* Category Breakdown */}
                        {data?.stats?.byCategory && (
                            <Section style={styles.section} aria-label="Expenses by category">
                                <Heading style={styles.heading} as="h2">
                                    Expenses by Category
                                </Heading>
                                {Object.entries(data?.stats.byCategory).map(
                                    ([category, amount]) => (
                                        <div key={category} style={styles.row}>
                                            <Text style={styles.text}>{category}</Text>
                                            <Text style={styles.text}>₦{amount.toLocaleString()}</Text>
                                        </div>
                                    )
                                )}
                            </Section>
                        )}

                        {/* AI Insights */}
                        {data?.insights && (
                            <Section style={styles.section} aria-label="Financial insights">
                                <Heading style={styles.heading} as="h2">
                                    Lejar Insights
                                </Heading>
                                {data.insights.map((insight, index) => (
                                    <Text key={index} style={styles.text}>
                                        • {insight}
                                    </Text>
                                ))}
                            </Section>
                        )}

                        <Text style={styles.footer}>
                            Thank you for using Lejar! Keep managing your money like a pro.{" "}
                            <a
                                href="https://lejar.vercel.app"
                                style={styles.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Check your Lejar app for more!
                            </a>
                        </Text>
                    </Container>
                </Body>
            </Html>
        );
    }

    if (type === "budget-alert") {
        return (
            <Html>
                <Head />
                <Preview>Lejar Budget Alert</Preview>
                <Body style={styles.body}>
                    <Container style={styles.container}>
                        <Heading style={styles.title} as="h1">
                            Budget Alert
                            <div style={styles.titleUnderline}></div>
                        </Heading>
                        <Text style={styles.text}>Hello {userName},</Text>
                        <Text style={styles.text}>
                            You don use {data?.percentageUsed.toFixed(1)}% of your monthly budget.
                        </Text>
                        <Section style={styles.statsContainer} aria-label="Budget summary">
                            <div style={styles.stat}>
                                <Text style={styles.text}>Budget Amount</Text>
                                <Text style={styles.heading}>₦{data?.budgetAmount.toLocaleString()}</Text>
                            </div>
                            <div style={styles.stat}>
                                <Text style={styles.text}>Spent So Far</Text>
                                <Text style={styles.heading}>₦{data?.totalExpenses.toLocaleString()}</Text>
                            </div>
                            <div style={styles.stat}>
                                <Text style={styles.text}>Remaining</Text>
                                <Text style={styles.heading}>
                                    ₦{(data?.budgetAmount - data?.totalExpenses).toLocaleString()}
                                </Text>
                            </div>
                        </Section>
                        <Text style={styles.footer}>
                            Keep an eye on your spending with Lejar!{" "}
                            <a
                                href="https://lejar.vercel.app"
                                style={styles.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open the app to adjust your budget.
                            </a>
                        </Text>
                    </Container>
                </Body>
            </Html>
        );
    }
}

const styles = {
    body: {
        backgroundColor: "#FFF7ED",
        fontFamily: "'Inter', -apple-system, sans-serif",
        padding: "16px",
    },
    container: {
        background: "linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)",
        margin: "0 auto",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 4px 16px rgba(249, 115, 22, 0.15)",
        maxWidth: "600px",
    },
    title: {
        color: "#7C2D12",
        fontSize: "28px",
        fontWeight: "700",
        textAlign: "center",
        margin: "0 0 24px",
    },
    titleUnderline: {
        width: "80px",
        height: "4px",
        background: "linear-gradient(to right, #F97316, #9A3412)",
        borderRadius: "2px",
        margin: "8px auto 0",
    },
    heading: {
        color: "#7C2D12",
        fontSize: "20px",
        fontWeight: "600",
        margin: "0 0 16px",
    },
    text: {
        color: "#9A3412",
        fontSize: "16px",
        margin: "0 0 12px",
        lineHeight: "1.5",
    },
    section: {
        marginTop: "24px",
        padding: "16px",
        backgroundColor: "#fed7aa",
        borderRadius: "12px",
        border: "1px solid #f97316",
    },
    statsContainer: {
        margin: "24px 0",
        padding: "16px",
        backgroundColor: "#FFF7ED",
        borderRadius: "12px",
        border: "1px solid #f97316",
    },
    stat: {
        marginBottom: "12px",
        padding: "12px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(249, 115, 22, 0.1)",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid #fed7aa",
    },
    footer: {
        color: "#9A3412",
        fontSize: "14px",
        textAlign: "center",
        marginTop: "24px",
        paddingTop: "16px",
        borderTop: "1px solid #fed7aa",
    },
    link: {
        color: "#F97316",
        textDecoration: "underline",
        fontWeight: "500",
    },
};