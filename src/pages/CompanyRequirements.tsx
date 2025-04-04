
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Building, Check, X } from "lucide-react";
import PageHeader from "../components/PageHeader";
import companiesData from "../data/companies.json";

interface Company {
  id: number;
  name: string;
  minCGPA: number;
  sector: string;
  ctc: string;
  description: string;
}

const CompanyRequirements = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [userCGPA, setUserCGPA] = useState<number | null>(null);
  const [minCGPA, setMinCGPA] = useState<number | null>(null);
  const [maxCGPA, setMaxCGPA] = useState<number | null>(null);

  useEffect(() => {
    setCompanies(companiesData);
    
    // Extract unique sectors
    const sectors = Array.from(new Set(companiesData.map(company => company.sector)));
    
    // Find min and max CGPA
    const cgpas = companiesData.map(company => company.minCGPA);
    setMinCGPA(Math.min(...cgpas));
    setMaxCGPA(Math.max(...cgpas));
  }, []);

  const toggleSector = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sector));
    } else {
      setSelectedSectors([...selectedSectors, sector]);
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(company.sector);
    const matchesCGPA = userCGPA === null || company.minCGPA <= userCGPA;
    return matchesSearch && matchesSector && matchesCGPA;
  });

  const uniqueSectors = Array.from(new Set(companies.map(company => company.sector)));

  return (
    <>
      <PageHeader
        title="Company CGPA Requirements"
        description="Explore the minimum CGPA requirements for companies recruiting at VIT."
      />

      <motion.div
        className="glass-card rounded-xl p-6 md:p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search Companies</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search by company name..."
                className="w-full pl-10 pr-3 py-2 rounded-md border border-input bg-transparent input-focus-ring"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Your CGPA (Optional)</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.01"
              placeholder="Enter your CGPA"
              className="w-full px-3 py-2 rounded-md border border-input bg-transparent input-focus-ring"
              value={userCGPA === null ? "" : userCGPA}
              onChange={(e) => {
                const value = e.target.value === "" ? null : parseFloat(e.target.value);
                setUserCGPA(value);
              }}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Filter by Sector</label>
            <div className="flex flex-wrap gap-2">
              {uniqueSectors.map((sector) => (
                <button
                  key={sector}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedSectors.includes(sector)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  onClick={() => toggleSector(sector)}
                >
                  {sector}
                </button>
              ))}
              {selectedSectors.length > 0 && (
                <button
                  className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                  onClick={() => setSelectedSectors([])}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {filteredCompanies.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Building className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No companies found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                className="glass-card rounded-xl p-6 card-hover flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{company.name}</h3>
                  {userCGPA !== null && (
                    userCGPA >= company.minCGPA ? (
                      <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center text-xs font-medium">
                        <Check size={12} className="mr-1" />
                        Eligible
                      </div>
                    ) : (
                      <div className="px-2 py-1 bg-red-100 text-red-800 rounded-full flex items-center text-xs font-medium">
                        <X size={12} className="mr-1" />
                        Not Eligible
                      </div>
                    )
                  )}
                </div>
                
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium mr-2">Min CGPA:</span>
                  <span className="text-lg font-semibold text-primary">{company.minCGPA.toFixed(1)}</span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <span className="text-sm font-medium w-20">Sector:</span>
                    <span className="text-sm">{company.sector}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium w-20">Package:</span>
                    <span className="text-sm">{company.ctc}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm flex-grow">{company.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyRequirements;
