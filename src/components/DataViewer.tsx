
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Mail, Phone, User, Clock, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAllBookings, getAllContacts, BookingData, ContactData } from '@/services/firebaseService';

const DataViewer = () => {
  const { data: bookings, isLoading: bookingsLoading, refetch: refetchBookings } = useQuery({
    queryKey: ['bookings'],
    queryFn: getAllBookings,
  });

  const { data: messages, isLoading: messagesLoading, refetch: refetchMessages } = useQuery({
    queryKey: ['contacts'],
    queryFn: getAllContacts,
  });

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const handleRefresh = () => {
    refetchBookings();
    refetchMessages();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage appointments and patient messages</p>
          <Button onClick={handleRefresh} className="mt-4">
            Refresh Data
          </Button>
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bookings">
              Appointments ({bookings?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="messages">
              Patient Messages ({messages?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <div className="text-center py-8">Loading appointments...</div>
                ) : !bookings || bookings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No appointments found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Appointment</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Message</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <User size={16} />
                                <span className="font-medium">{booking.firstName} {booking.lastName}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-1 text-sm">
                                  <Mail size={12} />
                                  <span>{booking.email}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-sm">
                                  <Phone size={12} />
                                  <span>{booking.phone}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                {booking.service}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-1 text-sm">
                                  <Calendar size={12} />
                                  <span className="font-medium">{booking.date}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-sm">
                                  <Clock size={12} />
                                  <span>{booking.time}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {formatDate(booking.createdAt)}
                            </TableCell>
                            <TableCell>
                              {booking.message ? (
                                <div className="max-w-xs">
                                  <p className="text-sm text-gray-700 truncate" title={booking.message}>
                                    {booking.message}
                                  </p>
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">No message</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Messages</CardTitle>
                <p className="text-sm text-gray-600">Messages received from the contact form</p>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="text-center py-8">Loading messages...</div>
                ) : !messages || messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p>No messages received yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <Card key={message.id} className="border-l-4 border-l-physio-blue">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="flex items-center space-x-2">
                                  <User size={16} className="text-physio-blue" />
                                  <span className="font-semibold text-gray-900">{message.name}</span>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  message.status === 'replied' ? 'bg-green-100 text-green-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {message.status === 'replied' ? 'Replied' : 'New'}
                                </span>
                              </div>
                              
                              <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                  <Mail size={14} />
                                  <span>{message.email}</span>
                                </div>
                                {message.phone && (
                                  <div className="flex items-center space-x-2">
                                    <Phone size={14} />
                                    <span>{message.phone}</span>
                                  </div>
                                )}
                                <div className="flex items-center space-x-2">
                                  <Clock size={14} />
                                  <span>{formatDate(message.createdAt)}</span>
                                </div>
                                {message.service && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                      Service: {message.service}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <MessageSquare size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Message:</p>
                                <p className="text-gray-800 leading-relaxed">{message.message}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(`mailto:${message.email}?subject=Re: Your inquiry&body=Hello ${message.name},%0D%0A%0D%0AThank you for contacting us.%0D%0A%0D%0A`, '_self')}
                            >
                              Reply via Email
                            </Button>
                            {message.phone && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => window.open(`tel:${message.phone}`, '_self')}
                              >
                                Call
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataViewer;
