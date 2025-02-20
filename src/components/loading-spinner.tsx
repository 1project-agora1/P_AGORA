export default function LoadingSpinner() {
    return (
        <div className="relative size-12">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent animate-spin rounded-full"></div>
        </div>
    )
}