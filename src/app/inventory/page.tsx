import { Suspense } from 'react';
import InventoryPageContent from './_components/page-content';

export default function InventoryPage() {
    return (
        <Suspense fallback={<p>Loading inventory...</p>}>
            <InventoryPageContent />
        </Suspense>
    );
}
