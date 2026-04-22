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
      question: (item.Question || item.question || '').toString().trim(),
      answer: (item.Answer || item.answer || '').toString().trim()
    }));
  } catch (error) {
    console.error('Error loading KB:', error);
    return [];
  }
};

const stopWords = new Set(['what', 'where', 'when', 'how', 'who', 'the', 'is', 'are', 'was', 'were', 'for', 'and', 'with', 'about', 'from', 'at', 'in', 'on', 'to', 'of', 'your', 'my', 'me', 'you', 'can', 'could', 'should', 'would', 'will', 'do', 'does', 'did', 'have', 'has', 'had', 'tell', 'explain', 'give', 'information', 'about']);

export const findRelevantQA = (query, kb) => {
  if (!kb || kb.length === 0) return [];

  // Normalize query
  const cleanQuery = query.toLowerCase().replace(/[^\w\s]/g, '');
  const queryWords = cleanQuery.split(/\s+/).filter(word => word.length > 2 && !stopWords.has(word));
  
  if (queryWords.length === 0) {
    // If all words were stop words, just use the original words longer than 2 chars
    queryWords.push(...cleanQuery.split(/\s+/).filter(word => word.length > 2));
  }

  const scoredKB = kb.map(item => {
    let score = 0;
    const qLower = item.question.toLowerCase().replace(/[^\w\s]/g, '');
    const aLower = item.answer.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Exact match boost
    if (qLower === cleanQuery) score += 500;
    if (qLower.includes(cleanQuery)) score += 200;
    
    // Keyword match in question
    queryWords.forEach(word => {
      if (qLower.includes(word)) {
        score += 50;
        // Word boundary match bonus
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(qLower)) score += 50;
      }
      
      // Keyword match in answer (half weight)
      if (aLower.includes(word)) {
        score += 20;
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(aLower)) score += 20;
      }
    });

    // Length similarity (punish very different lengths)
    const lengthDiff = Math.abs(qLower.length - cleanQuery.length);
    if (lengthDiff < 10) score += 30;

    return { ...item, score };
  });

  // Filter out zero scores and sort by descending score
  const results = scoredKB
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4); // Take top 4 for more context

  return results;
};
