import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';
import { FeasibilityStudy } from '@/types';

const styles = StyleSheet.create({
  page: { 
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica'
  },
  title: { 
    fontSize: 24, 
    marginBottom: 30,
    color: '#111827',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  section: { 
    marginBottom: 24,
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 8,
    border: '1px solid #e5e7eb'
  },
  sectionTitle: { 
    fontSize: 18, 
    marginBottom: 10,
    color: '#2563eb',
    fontWeight: 'bold'
  },
  content: { 
    fontSize: 12, 
    lineHeight: 1.5,
    color: '#4b5563'
  },
  scoreSection: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20,
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 4
  },
  score: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#2563eb'
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginTop: 4
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4
  }
});

interface FeasibilityPdfProps {
  feasibilityStudy: FeasibilityStudy;
}

export const FeasibilityPdf = ({ feasibilityStudy }: FeasibilityPdfProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Feasibility Study Report</Text>

      <View style={styles.scoreSection}>
        <Text style={styles.score}>Overall Score: {feasibilityStudy.overallScore}%</Text>
        <Text style={styles.score}>Technical: {feasibilityStudy.technicalScore}%</Text>
        <Text style={styles.score}>Financial: {feasibilityStudy.financialScore}%</Text>
        <Text style={styles.score}>Operational: {feasibilityStudy.operationalScore}%</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommendation</Text>
        <Text style={styles.content}>{feasibilityStudy.recommendation}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Steps</Text>
        {feasibilityStudy.nextSteps.map((step, index) => (
          <Text key={index} style={styles.content}>• {step}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Financial Data</Text>
        <Text style={styles.content}>Estimated Cost: {feasibilityStudy.financialData.estimatedCost}</Text>
        <Text style={styles.content}>Projected ROI: {feasibilityStudy.financialData.projectedRoi}</Text>
        <Text style={styles.content}>Payback Period: {feasibilityStudy.financialData.paybackPeriod}</Text>
      </View>
    </Page>
  </Document>
);