import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';
import { RfpDocument } from '@/types';

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
  subsection: { 
    marginLeft: 20, 
    marginTop: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 4
  },
  subsectionTitle: { 
    fontSize: 14, 
    marginBottom: 5,
    color: '#4b5563',
    fontWeight: 'bold'
  }
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