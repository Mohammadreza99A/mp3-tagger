import React, { useState, useContext, useEffect } from 'react';

// Material components
import TextField from '@material-ui/core/TextField';

import { MetadataContext } from '../../../context/MetadataContext';

export default function FileNameInput(): ReactElement {
  const { fileName, updateFileName } = useContext(MetadataContext);

  const [fileNameInput, setFileNameInput] = useState<string>('');

  const handleFileNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileNameInput(e.currentTarget.value);
    updateFileName(e.currentTarget.value);
  };

  useEffect(() => {
    setFileNameInput(fileName);
  }, [fileName]);

  return (
    <TextField
      size="small"
      label="File Name"
      variant="outlined"
      value={fileNameInput}
      onChange={handleFileNameInputChange}
      fullWidth
    />
  );
}
