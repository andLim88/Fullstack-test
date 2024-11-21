import { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { validateImage } from '../utils/validation';

const validationSchema = Yup.object().shape({
  recipientName: Yup.string().required('Recipient name is required'),
  message: Yup.string().required('Message is required'),
  senderName: Yup.string().required('Sender name is required'),
});

const CardForm = ({ onSubmit, isGenerating }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef(null);

  const initialValues = {
    recipientName: '',
    message: '',
    senderName: '',
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    setImageError('');

    if (file) {
      try {
        const validationResult = await validateImage(file);
        if (!validationResult.isValid) {
          setImageError(validationResult.error);
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        setImageError('Error processing image. Please try again.');
        console.error('Image processing error:', error);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Gift Card</h2>
      
      <div className="mb-6">
        <div className="flex flex-col items-center">
          {previewImage ? (
            <div className="relative w-full aspect-video mb-4">
              <img
                src={previewImage}
                alt="Background preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setPreviewImage(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ) : (
            <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 text-gray-700 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Select a background image</span>
              <input
                type="file"
                className="hidden p-3"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
              />
            </label>
          )}
          {imageError && (
            <p className="mt-2 text-red-500 text-sm">{imageError}</p>
          )}
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit({ ...values, backgroundImage: previewImage });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Dear</label>
              <Field
                type="text"
                name="recipientName"
                className="mt-1 p-3 block w-1/2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <ErrorMessage
                name="recipientName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <Field
                as="textarea"
                name="message"
                rows={3}
                className="mt-1 block w-1/2 p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">From</label>
              <Field
                type="text"
                name="senderName"
                className="mt-1 p-2 block w-1/2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <ErrorMessage
                name="senderName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isGenerating}
              className=" flex justify-center py-2 px-4 mx-auto border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none cursor-pointer"
            >
              {isGenerating ? 'Generating...' : 'Generate Card'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CardForm;