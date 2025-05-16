
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';
import { ProjectPlan } from '@/types';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, marginBottom: 10 },
  content: { fontSize: 12, lineHeight: 1.5 },
  table: { width: '100%', marginBottom: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#EEE', padding: 5 },
  tableHeader: { fontWeight: 'bold' },
  tableCell: { flex: 1 }
});

interface ProjectPlanPdfProps {
  projectPlan: ProjectPlan;
}

export const ProjectPlanPdf = ({ projectPlan }: ProjectPlanPdfProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{projectPlan.projectName} - Project Plan</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Project Overview</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Type</Text>
            <Text style={styles.tableCell}>Duration</Text>
            <Text style={styles.tableCell}>Cost</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{projectPlan.projectType}</Text>
            <Text style={styles.tableCell}>{projectPlan.duration}</Text>
            <Text style={styles.tableCell}>{projectPlan.estimatedCost}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Milestones</Text>
        {projectPlan.milestones.map((milestone, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.content}>{milestone.name}</Text>
            <Text style={styles.content}>{milestone.targetDate}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resource Allocation</Text>
        {projectPlan.resourceAllocation.map((resource, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.content}>{resource.role}</Text>
            <Text style={styles.content}>{resource.allocation}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Risk Assessment</Text>
        {projectPlan.riskAssessment.map((risk, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.content}>{risk.category}</Text>
            <Text style={styles.content}>{risk.probability}</Text>
            <Text style={styles.content}>{risk.impact}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
