import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { saveBooking } from '@/services/firebaseService';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const services = [
    'Sports Injury Recovery',
    'Pain Management',
    'Manual Therapy',
    'Injury Prevention',
    'Post-Surgery Rehabilitation',
    'Chronic Pain Treatment'
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  useEffect(() => {
    const isValid = 
      formData.firstName.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.service !== '' &&
      formData.date !== '' &&
      formData.time !== '' &&
      formData.message.trim() !== '';
    setIsFormValid(isValid);
  }, [formData]);

  const validateStep1 = () => {
    const errors = [];
    if (!formData.firstName.trim()) {
      errors.push({ field: 'First Name', message: 'First Name is required' });
    }
    if (!formData.phone.trim()) {
      errors.push({ field: 'Phone Number', message: 'Phone Number is required' });
    }
    return errors;
  };

  const validateStep2 = () => {
    const errors = [];
    if (!formData.service) {
      errors.push({ field: 'Service', message: 'Service selection is required' });
    }
    if (!formData.date) {
      errors.push({ field: 'Date', message: 'Preferred Date is required' });
    }
    if (!formData.time) {
      errors.push({ field: 'Time', message: 'Preferred Time is required' });
    }
    if (!formData.message.trim()) {
      errors.push({ field: 'Condition', message: 'Condition description is required' });
    }
    return errors;
  };

  const showValidationErrors = (errors: { field: string; message: string }[]) => {
    errors.forEach(error => {
      toast({
        title: `Missing ${error.field}`,
        description: error.message,
        variant: "destructive",
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = [...validateStep1(), ...validateStep2()];
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }
    
    setIsLoading(true);

    try {
      await saveBooking(formData);
      setIsSubmitted(true);
      toast({
        title: "Booking Confirmed!",
        description: "Your appointment has been successfully booked. We'll contact you shortly.",
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setStep(1);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          message: ''
        });
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      const errors = validateStep1();
      if (errors.length > 0) {
        showValidationErrors(errors);
        return;
      }
    }
    if (step === 2) {
      const errors = validateStep2();
      if (errors.length > 0) {
        showValidationErrors(errors);
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600">
              Thank you for booking with PhysioHeal. We'll contact you shortly to confirm your appointment.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-center">
            Book Your Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= i ? 'bg-physio-blue text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i}
                </div>
                {i < 3 && <div className={`w-12 h-0.5 ${step > i ? 'bg-physio-blue' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-8 text-sm">
            <span className={step >= 1 ? 'text-physio-blue' : 'text-gray-500'}>Personal Info</span>
            <span className={step >= 2 ? 'text-physio-blue' : 'text-gray-500'}>Service & Date</span>
            <span className={step >= 3 ? 'text-physio-blue' : 'text-gray-500'}>Confirmation</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="h-12"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>
              <Button 
                type="button" 
                onClick={nextStep} 
                className="w-full h-12 bg-gradient-physio"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Needed *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-physio-blue"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-physio-blue"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your condition or any specific concerns..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex space-x-4">
                <Button type="button" onClick={prevStep} variant="outline" className="flex-1 h-12">
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={nextStep} 
                  className="flex-1 h-12 bg-gradient-physio"
                >
                  Review
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Appointment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{formData.email || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Service:</span>
                    <span>{formData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{new Date(formData.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Time:</span>
                    <span>{formData.time}</span>
                  </div>
                  {formData.message && (
                    <div>
                      <span className="font-medium">Condition:</span>
                      <p className="text-sm text-gray-600 mt-1">{formData.message}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <div className="flex space-x-4">
                <Button type="button" onClick={prevStep} variant="outline" className="flex-1 h-12">
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 h-12 bg-gradient-physio"
                >
                  {isLoading ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;