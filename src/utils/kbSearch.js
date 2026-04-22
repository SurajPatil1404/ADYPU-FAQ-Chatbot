import * as XLSX from 'xlsx';

export const loadKB = async () => {
  try {
    const response = await fetch('/ADYPU_FAQ_ChatbotKB.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    return jsonData.map(item => ({
      question: item.Question || item.question || '',
      answer: item.Answer || item.answer || ''
    }));
  } catch (error) {
    console.error('Error loading KB:', error);
    return [];
  }
};

export const findRelevantQA = (query, kb) => {
  if (!kb || kb.length === 0) return [];

  const searchTerms = query.toLowerCase().split(' ').filter(t => t.length > 2);
  
  const scoredKB = kb.map(item => {
    let score = 0;
    const qLower = item.question.toLowerCase();
    
    // Exact match boost
    if (qLower === query.toLowerCase()) score += 100;
    
    // Keyword match
    searchTerms.forEach(term => {
      if (qLower.includes(term)) score += 10;
    });
    
    return { ...item, score };
  });

  return scoredKB
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};
