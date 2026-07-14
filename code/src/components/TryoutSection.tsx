import React from 'react';
import { ArrowRight, Handshake, Settings, Send, Target, Sparkles, TrendingUp, Crown, Zap, Users, CheckCircle2 } from 'lucide-react';

export function TryoutSection() {
  return (
    <section className="w-full bg-[#F7E9E8] py-20 px-4 sm:px-6 z-20 relative text-[#282828]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Top Row: "How We Work?" and Red Card side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Card: How We Work? */}
          <div className="lg:col-span-2 bg-[#F7E9E8] rounded-3xl p-8 lg:p-12 border border-[#E5D5D3]">
            <div className="flex flex-col gap-12 h-full">
              <div className="flex-1 flex flex-col items-start">
                <span className="text-[#AD1D12] text-xs font-bold tracking-widest uppercase mb-4">How We Work?</span>
                <h3 className="text-[11px] sm:text-sm md:text-xl lg:text-2xl xl:text-3xl font-extrabold tracking-tight leading-tight mb-4 whitespace-nowrap">
                  We Simplify The Journey From Design To Launch.
                </h3>
                <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-[#282828]/70 whitespace-nowrap">
                  We make it easy to bring your ideas to life, guiding you from concept to a fully launched Brand.
                </p>
              </div>
              
              <div className="flex-[1.5] relative">
                {/* Horizontal Timeline Line for sm/lg screens */}
                <div className="hidden sm:block absolute top-6 left-12 right-12 h-[1px] bg-[#E5D5D3] -z-10"></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {/* Step 1 */}
                  <div className="flex flex-col relative z-10">
                    <div className="w-12 h-12 bg-[#F7E9E8] rounded-xl border border-[#E5D5D3] flex items-center justify-center mb-6 relative">
                      <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#AD1D12] text-[#F7E9E8] rounded-full flex items-center justify-center text-[10px] font-bold">01</div>
                      <Handshake className="w-6 h-6 text-[#AD1D12]" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Kickoff</h4>
                    <p className="text-xs text-[#282828]/70 mb-4">
                      We align with you to understand your goals, vision, and expectations through in-depth discussions and research.
                    </p>
                    <ul className="flex flex-col gap-2">
                      <li className="flex items-center gap-2 text-xs font-medium"><CheckCircle2 className="w-4 h-4 text-[#AD1D12] shrink-0" /> Comprehensive Consultation</li>
                      <li className="flex items-center gap-2 text-xs font-medium"><CheckCircle2 className="w-4 h-4 text-[#AD1D12] shrink-0" /> Project Roadmap</li>
                    </ul>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col relative z-10">
                    <div className="w-12 h-12 bg-[#F7E9E8] rounded-xl border border-[#E5D5D3] flex items-center justify-center mb-6 relative">
                      <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#AD1D12] text-[#F7E9E8] rounded-full flex items-center justify-center text-[10px] font-bold">02</div>
                      <Settings className="w-6 h-6 text-[#AD1D12]" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Execution</h4>
                    <p className="text-xs text-[#282828]/70 mb-4">
                      With a clear strategy in place, we move into the execution phase, where ideas come to life with high efficiency and collaboration.
                    </p>
                    <ul className="flex flex-col gap-2">
                      <li className="flex items-center gap-2 text-xs font-medium"><CheckCircle2 className="w-4 h-4 text-[#AD1D12] shrink-0" /> Seamless Integration</li>
                      <li className="flex items-center gap-2 text-xs font-medium"><CheckCircle2 className="w-4 h-4 text-[#AD1D12] shrink-0" /> Real Time Collaboration</li>
                    </ul>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col relative z-10">
                    <div className="w-12 h-12 bg-[#F7E9E8] rounded-xl border border-[#E5D5D3] flex items-center justify-center mb-6 relative">
                      <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#AD1D12] text-[#F7E9E8] rounded-full flex items-center justify-center text-[10px] font-bold">03</div>
                      <Send className="w-6 h-6 text-[#AD1D12]" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Handoff</h4>
                    <p className="text-xs text-[#282828]/70 mb-4">
                      We provide you with all the assets, documentation, and support to ensure a smooth and successful launch.
                    </p>
                    <ul className="flex flex-col gap-2">
                      <li className="flex items-center gap-2 text-xs font-medium"><CheckCircle2 className="w-4 h-4 text-[#AD1D12] shrink-0" /> Book an Appointment</li>
                      <li className="flex items-center gap-2 text-xs font-medium"><CheckCircle2 className="w-4 h-4 text-[#AD1D12] shrink-0" /> Ongoing Support</li>
                      <li className="flex items-center gap-2 text-xs font-medium"><CheckCircle2 className="w-4 h-4 text-[#AD1D12] shrink-0" /> Documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tall Red Card */}
          <div className="bg-[#AD1D12] rounded-3xl p-8 lg:p-12 text-[#F7E9E8] relative overflow-hidden flex flex-col justify-between h-full">
            {/* Abstract background graphics representing the ribbons */}
            <div className="absolute bottom-0 right-0 w-full h-[60%] opacity-40 pointer-events-none">
              <div className="absolute bottom-[-10%] -right-[10%] w-[120%] h-[120%] bg-gradient-to-tr from-[#FF3333] to-transparent rounded-full blur-3xl mix-blend-overlay"></div>
              <div className="absolute top-[20%] left-[20%] w-[80%] h-[80%] bg-gradient-to-bl from-[#000000] to-transparent rounded-full blur-2xl mix-blend-multiply"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-6">
                Work With us seamlessly on various project
              </h3>
              <p className="text-sm text-[#F7E9E8]/80 mb-8 max-w-sm">
                From static to motion, and even full websites, we've got you covered.
              </p>
              
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-[#F7E9E8]/90 shrink-0" /> Quick Turnaround</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-[#F7E9E8]/90 shrink-0" /> Launch-Ready Designs</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-[#F7E9E8]/90 shrink-0" /> Requests & Revisions</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-[#F7E9E8]/90 shrink-0" /> Worry Free Pricing</li>
              </ul>
            </div>
          </div>
          
        </div>

        {/* Bottom Row: "Why Choose Us?" taking full width */}
        <div className="bg-[#F7E9E8] rounded-3xl p-8 lg:p-12 border border-[#E5D5D3]">
          <div className="flex flex-col gap-12 h-full">
            <div className="flex-1 flex flex-col items-start">
              <span className="text-[#AD1D12] text-xs font-bold tracking-widest uppercase mb-2">Why Choose Us?</span>
              <h3 className="text-[11px] sm:text-sm md:text-xl lg:text-2xl xl:text-3xl font-extrabold tracking-tight leading-tight mb-1 whitespace-nowrap">
                We Don't Just Design, We Help you Realize your vision
              </h3>
              <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-[#282828] whitespace-nowrap">
                If You Can Dream It, We Can make it happen
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-[#F7E9E8] p-5 rounded-2xl border border-[#E5D5D3] flex flex-col h-full">
                <Target className="w-8 h-8 text-[#AD1D12] mb-4" strokeWidth={1.5} />
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-bold text-sm leading-tight">Strategic Branding</h5>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#AD1D12]/30 text-[#AD1D12]">PRO</span>
                </div>
                <p className="text-xs text-[#282828]/70 mt-auto">We design with clarity and purpose.</p>
              </div>
              {/* Feature 2 */}
              <div className="bg-[#F7E9E8] p-5 rounded-2xl border border-[#E5D5D3] flex flex-col h-full">
                <Sparkles className="w-8 h-8 text-[#AD1D12] mb-4" strokeWidth={1.5} />
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-bold text-sm leading-tight">Standout Design Solutions</h5>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#AD1D12]/30 text-[#AD1D12]">NEW</span>
                </div>
                <p className="text-xs text-[#282828]/70 mt-auto">Helping brands get noticed.</p>
              </div>
              {/* Feature 3 */}
              <div className="bg-[#F7E9E8] p-5 rounded-2xl border border-[#E5D5D3] flex flex-col h-full">
                <TrendingUp className="w-8 h-8 text-[#AD1D12] mb-4" strokeWidth={1.5} />
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-bold text-sm leading-tight">Results-Driven Creativity</h5>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#AD1D12]/30 text-[#AD1D12]">NEW</span>
                </div>
                <p className="text-xs text-[#282828]/70 mt-auto">Designs that deliver impact.</p>
              </div>
              {/* Feature 4 */}
              <div className="bg-[#F7E9E8] p-5 rounded-2xl border border-[#E5D5D3] flex flex-col h-full">
                <Crown className="w-8 h-8 text-[#AD1D12] mb-4" strokeWidth={1.5} />
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-bold text-sm leading-tight">A Decade of Mastery</h5>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#AD1D12]/30 text-[#AD1D12]">NEW</span>
                </div>
                <p className="text-xs text-[#282828]/70 mt-auto">10+ years of excellence.</p>
              </div>
              {/* Feature 5 */}
              <div className="bg-[#F7E9E8] p-5 rounded-2xl border border-[#E5D5D3] flex flex-col h-full">
                <Zap className="w-8 h-8 text-[#AD1D12] mb-4" strokeWidth={1.5} />
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-bold text-sm leading-tight">Fast & Flexible Delivery</h5>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#AD1D12]/30 text-[#AD1D12]">PRO</span>
                </div>
                <p className="text-xs text-[#282828]/70 mt-auto">Quick turnaround, no compromise.</p>
              </div>
              {/* Feature 6 */}
              <div className="bg-[#F7E9E8] p-5 rounded-2xl border border-[#E5D5D3] flex flex-col h-full">
                <Users className="w-8 h-8 text-[#AD1D12] mb-4" strokeWidth={1.5} />
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-bold text-sm leading-tight">Designer Empowerment</h5>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#AD1D12]/30 text-[#AD1D12]">NEW</span>
                </div>
                <p className="text-xs text-[#282828]/70 mt-auto">Raising next-gen creatives.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
