import { Button } from '@mantine/core'
import { ErrorResponse, useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
  const error = useRouteError()
  console.log(error)

  return (
    <div className="grid items-center justify-center w-full h-full bg-center bg-no-repeat bg-cover bg-not-found-error">
      <div className="px-4 py-2 space-y-8 bg-transparent">
        <div className="space-y-8">
          <div className="flex flex-wrap space-x-4">
            {(error as ErrorResponse) && (
              <div className="text-6xl">
                {(error as ErrorResponse).status} -
                {(error as ErrorResponse).statusText}
              </div>
            )}
            <div className="text-6xl">Something Went Wrong.</div>
          </div>
          {(error as ErrorResponse) && (
            <div className="text-3xl">
              {(error as ErrorResponse).data}, Please click the button to
              comeback to Home Page
            </div>
          )}
        </div>
        <div>
          <Button size="lg" component="a" href="/">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
export default ErrorBoundary
