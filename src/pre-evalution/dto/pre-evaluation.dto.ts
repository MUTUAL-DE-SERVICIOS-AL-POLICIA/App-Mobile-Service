export class AffiliateInfoDto {
  id: number;
  affiliateId: number;
  affiliate_state_type: string;
  subsector: string | null;
  pension_entity_name?: string | null;
  category?: string | null;
}

export class LoanParametersDto {
  debtIndex: number;
  guarantors: number;
  maxLenders: number;
  minLenderCategory: number;
  maxLenderCategory: number;
  maximumAmountModality: number;
  minimumAmountModality: number;
  maximumTermModality: number;
  minimumTermModality: number;
  loanMonthTerm: number;
  coveragePercentage: number;
  annualInterest: number;
  periodInterest: number;
}

export class LoanModalityResponseDto {
  id: number;
  affiliateId: number;
  procedure_modality_id: number;
  procedure_type_id: number;
  name: string;
  category: string | null;
  pension_entity_name?: string | null;
  affiliate_state_type: string;
  subsector?: string | null;
  parameters?: LoanParametersDto | null;
}