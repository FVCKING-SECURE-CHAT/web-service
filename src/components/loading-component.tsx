export const LoadingComponent = ({ color = 'black' }: { color?: 'black' | 'white' }) => {
    return (
        <div className={`h-full aspect-square border-2 rounded-full border-${color} border-t-transparent animate-spin`}></div>
    )
}