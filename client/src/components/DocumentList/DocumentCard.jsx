import React from 'react';

const badgeColors = {
  DOCX: 'bg-blue-100 text-blue-700',
  JPEG: 'bg-green-100 text-green-700',
};

const DocumentCard = ({ doc }) => (
  <div className="bg-white p-5 rounded-2xl shadow mb-4 flex items-center">
    {/* Thumbnail */}
    {doc.fileUrl ? (
      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
        {doc.type === 'JPEG' || doc.type === 'PDF' ? (
          <img src={doc.fileUrl} alt="document" className="w-20 h-16 rounded mr-4 object-cover" />
        ) : (
          <div className="w-20 h-16 bg-blue-100 rounded mr-4 flex items-center justify-center">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" />
              <path strokeWidth="2" d="M14.752 11.168l-5.197-3.023A1 1 0 008 9.03v5.939a1 1 0 001.555.832l5.197-3.023a1 1 0 000-1.727z" />
            </svg>
          </div>
        )}
      </a>
    ) : (
      <div className="w-20 h-16 bg-gray-100 rounded mr-4 flex items-center justify-center">
        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" />
        </svg>
      </div>
    )}

    {/* Content */}
    <div className="flex-1">
      <div className="flex items-center mb-1 gap-2">
        <span className={`text-xs px-2 py-1 rounded ${badgeColors[doc.type] || "bg-gray-200"}`}>{doc.type}</span>
        {doc.tag && <span className="text-xs px-1 py-0.5 rounded bg-green-100 text-green-700">{doc.tag}</span>}
      </div>
      <h3 className="text-lg font-medium">{doc.title}</h3>
      <p className="text-gray-600 text-sm">{doc.desc}</p>
      <div className="flex gap-2 mt-2 flex-wrap text-xs text-gray-600">
        {doc.formats && doc.formats.map(fmt => <span key={fmt}>{fmt}</span>)}
        {doc.team && <span>{doc.team}</span>}
      </div>
      <div className="mt-3 flex gap-2">
        {doc.actions && doc.actions.map(a => (
          <button
            key={a}
            className="bg-blue-50 text-blue-600 px-3 py-1 rounded shadow text-xs hover:bg-blue-100"
          >{a}</button>
        ))}
        {doc.fileUrl && (
          <a
            href={doc.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-3 py-1 rounded shadow text-xs hover:bg-green-600"
          >
            Open Document
          </a>
        )}
      </div>
      {doc.extra && (
        <div className="mt-2 text-xs text-blue-600 cursor-pointer hover:underline">{doc.extra}</div>
      )}
    </div>
  </div>
);

export default DocumentCard;
