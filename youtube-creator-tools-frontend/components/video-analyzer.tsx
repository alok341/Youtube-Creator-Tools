/// <reference types="react" />
"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Eye, Heart, MessageCircle, AlertCircle, CheckCircle } from "lucide-react"

// Ensure JSX intrinsic elements exist in this module for TypeScript compilation
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

interface AnalysisResult {
  title: string
  views: number
  likes: number
  comments: number
  shares: number
  engagement: number
  suggestions: string[]
  engagementTrend: Array<{ day: string; engagement: number }>
  viewerDemographics: Array<{ category: string; percentage: number }>
}

export default function VideoAnalyzer() {
  const [videoUrl, setVideoUrl] = useState("")
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const extractVideoId = (url: string): string | null => {
    const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/, /youtube\.com\/embed\/([^&\n?#]+)/]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const generateMockAnalysis = (videoId: string): AnalysisResult => {
    const views = Math.floor(Math.random() * 1000000) + 10000
    const likes = Math.floor(views * (Math.random() * 0.08 + 0.02))
    const comments = Math.floor(views * (Math.random() * 0.02 + 0.003))
    const shares = Math.floor(views * (Math.random() * 0.01 + 0.001))
    const engagement = ((likes + comments + shares) / views) * 100

    return {
      title: "Sample Video Analysis",
      views,
      likes,
      comments,
      shares,
      engagement: Number.parseFloat(engagement.toFixed(2)),
      suggestions: [
        "Your engagement rate is above average for your category",
        "Consider adding more CTAs (Calls-to-Action) in your video",
        "Your comment section is active - keep engaging with viewers",
        "Video length appears optimal for your audience",
        "Thumbnail performed well with above 5% CTR",
      ],
      engagementTrend: [
        { day: "Day 1", engagement: 12.5 },
        { day: "Day 2", engagement: 18.3 },
        { day: "Day 3", engagement: 15.7 },
        { day: "Day 4", engagement: 22.1 },
        { day: "Day 5", engagement: 19.8 },
        { day: "Day 6", engagement: 25.4 },
        { day: "Day 7", engagement: 23.9 },
      ],
      viewerDemographics: [
        { category: "18-24", percentage: 28 },
        { category: "25-34", percentage: 35 },
        { category: "35-44", percentage: 18 },
        { category: "45-54", percentage: 12 },
        { category: "55+", percentage: 7 },
      ],
    }
  }

  const handleAnalyze = () => {
    setError("")
    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      setError("Please enter a valid YouTube URL")
      return
    }

    setLoading(true)
    setTimeout(() => {
      setAnalysis(generateMockAnalysis(videoId))
      setLoading(false)
    }, 1200)
  }

  const engagementColor = analysis?.engagement
    ? analysis.engagement > 5
      ? "#10b981"
      : analysis.engagement > 2
        ? "#f59e0b"
        : "#ef4444"
    : "#6b7280"

  const DEMOGRAPHIC_COLORS = ["#ff0000", "#00d4ff", "#10b981", "#f59e0b", "#8b5cf6"]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-100 mb-6">Video Performance Analyzer</h1>
        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border border-blue-800/30 rounded-xl p-8">
          <label className="block text-sm font-semibold text-gray-300 mb-3">YouTube URL</label>
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Paste YouTube URL to analyze..."
              value={videoUrl}
              onChange={(e) => {
                setVideoUrl(e.target.value)
                setError("")
              }}
              className="h-12 bg-slate-900/50 border-blue-800/50 text-white flex-1"
            />
            <Button
              onClick={handleAnalyze}
              disabled={loading || !videoUrl.trim()}
              className="px-8 h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-surface-light border-border p-6 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm">Views</p>
                <Eye className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold text-text">{(analysis.views / 1000).toFixed(1)}K</p>
              <p className="text-xs text-text-muted">Total video views</p>
            </Card>

            <Card className="bg-surface-light border-border p-6 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm">Likes</p>
                <Heart className="w-5 h-5 text-destructive" />
              </div>
              <p className="text-3xl font-bold text-text">{(analysis.likes / 1000).toFixed(1)}K</p>
              <p className="text-xs text-text-muted">
                {((analysis.likes / analysis.views) * 100).toFixed(2)}% like ratio
              </p>
            </Card>

            <Card className="bg-surface-light border-border p-6 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm">Comments</p>
                <MessageCircle className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold text-text">{(analysis.comments / 1000).toFixed(1)}K</p>
              <p className="text-xs text-text-muted">Community engagement</p>
            </Card>

            <Card className="bg-surface-light border-border p-6 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm">Engagement</p>
                <TrendingUp className="w-5 h-5" style={{ color: engagementColor }} />
              </div>
              <p className="text-3xl font-bold text-text" style={{ color: engagementColor }}>
                {analysis.engagement}%
              </p>
              <p className="text-xs text-text-muted">Overall engagement rate</p>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Trend */}
            <Card className="bg-surface-light border-border p-6">
              <h3 className="font-semibold text-text mb-4">7-Day Engagement Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analysis.engagementTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="#a0a7b8" />
                  <YAxis stroke="#a0a7b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#252d4a", border: "1px solid #3a4458", borderRadius: "8px" }}
                    labelStyle={{ color: "#e4e6eb" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="#00d4ff"
                    dot={{ fill: "#00d4ff", r: 4 }}
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Viewer Demographics */}
            <Card className="bg-surface-light border-border p-6">
              <h3 className="font-semibold text-text mb-4">Viewer Demographics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analysis.viewerDemographics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {analysis.viewerDemographics.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={DEMOGRAPHIC_COLORS[index % DEMOGRAPHIC_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#252d4a", border: "1px solid #3a4458", borderRadius: "8px" }}
                    labelStyle={{ color: "#e4e6eb" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Suggestions */}
          <Card className="bg-surface-light border-border p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-text">Optimization Suggestions</h3>
            </div>
            <div className="space-y-3">
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="flex gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-text-muted">{suggestion}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!analysis && !loading && (
        <div className="border-2 border-dashed border-border rounded-lg p-12 text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-surface-light rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-2">Analyze Video Performance</h3>
            <p className="text-text-muted">
              Enter a YouTube URL to get detailed analytics including engagement rates, viewer demographics, and
              optimization suggestions
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
