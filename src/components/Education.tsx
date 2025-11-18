import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { GraduationCap } from 'lucide-react'

const Education: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Education</h2>
      </div>
      <Card className="bg-spotify-gray border-spotify-light-gray hover:bg-spotify-light-gray transition-colors">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
              <img src="/images/waterloo.jpeg" alt="University of Waterloo" className="w-full h-full object-cover" />
            </div>
            <div>
              <CardTitle className="text-white">University of Waterloo</CardTitle>
              <p className="text-spotify-text-secondary text-sm mt-1">Waterloo, ON</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-white font-medium">Bachelor of Computer Science, Honors Co-op</p>
            <p className="text-spotify-text-secondary text-sm mt-1">Expected – June 2027</p>
          </div>
          <div>
            <p className="text-white text-sm font-medium mb-2">Relevant Courses:</p>
            <div className="flex flex-wrap gap-2">
              {['Algorithms', 'Object-Oriented Programming', 'Computer Architecture', 'Databases', 'Operating Systems', 'Networks'].map((course) => (
                <span key={course} className="px-3 py-1 bg-spotify-light-gray text-white text-xs rounded-full">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default Education
