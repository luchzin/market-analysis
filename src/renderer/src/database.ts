export type InvestorType = 'individual' | 'professional' | 'institution' | 'student'
export type RiskTolerance = 'conservative' | 'moderate' | 'aggressive'
export type PreferredMarkets = 'us-equities' | 'international' | 'crypto' | 'mixed'

export type ProfileRow = {
  id: string
  full_name: string | null
  display_name: string | null
  phone: string | null
  location: string | null
  website: string | null
  bio: string | null
  investor_type: InvestorType
  risk_tolerance: RiskTolerance
  preferred_markets: PreferredMarkets
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow
        Insert: {
          id: string
          full_name?: string | null
          display_name?: string | null
          phone?: string | null
          location?: string | null
          website?: string | null
          bio?: string | null
          investor_type?: InvestorType
          risk_tolerance?: RiskTolerance
          preferred_markets?: PreferredMarkets
          created_at?: string
          updated_at?: string
        }
        Update: {
          full_name?: string | null
          display_name?: string | null
          phone?: string | null
          location?: string | null
          website?: string | null
          bio?: string | null
          investor_type?: InvestorType
          risk_tolerance?: RiskTolerance
          preferred_markets?: PreferredMarkets
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
