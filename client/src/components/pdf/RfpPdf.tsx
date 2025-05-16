
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';
import { RfpDocument } from '@/types';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, marginBottom: 10 },
  content: { fontSize: 12, lineHeight: 1.5 },
  subsection: { marginLeft: 20, marginTop: 10 },
  subsectionTitle: { fontSize: 14, marginBottom: 5 }
});

interface RfpPdfProps {
  rfpDocument: RfpDocument;
}

export const RfpPdf = ({ rfpDocument }: RfpPdfProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Request for Proposal</Text>

      {rfpDocument.sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.content}>{section.content}</Text>
          
          {section.subsections?.map((subsection, subIndex) => (
            <View key={subIndex} style={styles.subsection}>
              <Text style={styles.subsectionTitle}>{subsection.title}</Text>
              <Text style={styles.content}>{subsection.content}</Text>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);
