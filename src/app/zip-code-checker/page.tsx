import ComponentLayout from '@/components/Layout/ComponentLayout'
import ZipCodeChecker from '@/components/ZipCodeChecker'
import React from 'react'

function page() {
  return (
    <ComponentLayout
      title="Zip Code Checker Component"
      description="A beautiful and customizable input component for collecting user information"
    >
      <ZipCodeChecker />
    </ComponentLayout>
  );
}

export default page